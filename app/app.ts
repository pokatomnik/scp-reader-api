import { Router } from '../lib/router/router';
import { NotFoundError } from './errors';

import { DocumentsHandler } from './controllers/get.documents.all';
import { DocumentsByTagsHandler } from './controllers/get.documents.bytags';
import { RecentDocumentsHandler } from './controllers/get.documents.recent';
import { ConfugurationHandler } from './controllers/get.configuration';
import { TagsHandler } from './controllers/get.tags';

import { ConfigurationService } from './services/configuration-service';
import { DocumentsService } from './services/documents-services';
import { TagsService } from './services/tags-service';

import type { IHandler } from '../lib/router';
import { PageNumberExtractor } from './controllers/page-extractor';
import { TagsExtractor } from './controllers/tags-extractor';

export class Application {
  private readonly configurationService = new ConfigurationService();

  private readonly documentsService = new DocumentsService({
    privateConfiguration: this.configurationService.getPrivateConfiguration(),
  });

  private readonly tagsService = new TagsService({
    privateConfiguration: this.configurationService.getPrivateConfiguration(),
  });

  public readonly router: Router;

  private readonly notFoundHandler: IHandler = {
    handle(_, response) {
      const error = new NotFoundError('No such endpoint');
      response.status(error.HTTPCode).json(error);
    },
  };

  public constructor() {
    this.router = new Router({
      notFoundHandler: this.notFoundHandler,
    })
      .addHandler(
        'GET',
        '/v1/configuration',
        new ConfugurationHandler({
          configurationService: this.configurationService,
        })
      )
      .addHandler(
        'GET',
        '/v1/documents/all/{pageNumber}',
        new DocumentsHandler({
          documentsService: this.documentsService,
          pageNumberExtractor: new PageNumberExtractor('pageNumber'),
        })
      )
      .addHandler(
        'GET',
        '/v1/documents/recent/{pageNumber}',
        new RecentDocumentsHandler({
          documentsService: this.documentsService,
          pageNumberExtractor: new PageNumberExtractor('pageNumber'),
        })
      )
      .addHandler(
        'GET',
        '/v1/documents/tags/{tags}',
        new DocumentsByTagsHandler({
          tagsService: this.tagsService,
          tagsExtractor: new TagsExtractor('tags'),
        })
      )
      .addHandler(
        'GET',
        '/v1/tags',
        new TagsHandler({
          tagsService: this.tagsService,
        })
      );
  }
}
