import { VercelResponse, VercelRequest, VercelRequestQuery } from '@vercel/node';
import trim from 'lodash/trim';
import type { IHandler } from './handler';

interface IMatchFound {
  found: true;
  params: VercelRequestQuery;
}

interface IMatchNotFound {
  found: false;
}

type Match = IMatchFound | IMatchNotFound;

export class Router {
  private static patternParams = {
    CHAR_START: '{',
    CHAR_END: '}',
    ALL_PATTERN_CHARS: '{}',
    PATH_SEPARATOR: '/',
  };

  private readonly handlers = new Map<string, Map<string, IHandler>>();

  public constructor(
    private readonly params: {
      notFoundHandler: IHandler;
    }
  ) {}

  public addHandler(this: this, methodRaw: string, pattern: string, handler: IHandler): this {
    const method = methodRaw.toLocaleLowerCase();
    const handlersByMethod: Map<string, IHandler> = this.handlers.get(method) ?? new Map();
    handlersByMethod.set(pattern, handler);
    this.handlers.set(method, handlersByMethod);

    return this;
  }

  private static patternPartToKey(patternPart: string) {
    return trim(patternPart, Router.patternParams.ALL_PATTERN_CHARS);
  }

  private static isPatternPart(part: string) {
    return part.startsWith('{') && part.endsWith('}');
  }

  private static getParams(partA: string, partB: string): VercelRequestQuery | null {
    if (partA === partB) {
      return {};
    }
    if (Router.isPatternPart(partA) && !Router.isPatternPart(partB)) {
      return { [Router.patternPartToKey(partA)]: partB };
    }
    if (!Router.isPatternPart(partA) && Router.isPatternPart(partB)) {
      return { [Router.patternPartToKey(partB)]: partA };
    }
    return null;
  }

  private static getMatch(pattern: string, path: string): Match {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) {
      return { found: false };
    }

    const length = Math.round((pathParts.length + pathParts.length) / 2);

    const params: VercelRequestQuery = {};

    for (let i = 0; i < length; ++i) {
      const currentPatternPart = patternParts[i];
      const currentPathPart = pathParts[i];
      if (currentPatternPart === undefined || currentPathPart === undefined) {
        return { found: false };
      }

      const currentParams = Router.getParams(currentPatternPart, currentPathPart);
      if (currentParams === null) {
        return { found: false };
      }

      Object.assign(params, currentParams);
    }

    return { found: true, params };
  }

  public vercelHandler(
    this: this,
    methodRaw: string,
    path: string
  ): (request: VercelRequest, response: VercelResponse) => void {
    const method = methodRaw.toLocaleLowerCase();
    const handlersByMethod: Map<string, IHandler> = this.handlers.get(method) ?? new Map();
    for (const [pattern, handler] of handlersByMethod.entries()) {
      const match = Router.getMatch(pattern, path);
      if (match.found) {
        return (request, response) => {
          request.query = match.params;
          handler.handle(request, response);
        };
      }
    }
    return (request, response) => {
      this.params.notFoundHandler.handle(request, response);
    };
  }
}
