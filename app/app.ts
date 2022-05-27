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

export class Application {
  private readonly configurationService = new ConfigurationService();

  private readonly documentsService = new DocumentsService({
    privateConfiguration: this.configurationService.getPrivateConfiguration(),
  });

  private readonly tagsService = new TagsService({
    privateConfiguration: this.configurationService.getPrivateConfiguration(),
  });

  private readonly handlers = {
    configuration: new ConfugurationHandler({
      configurationService: this.configurationService,
    }),
    docs: new DocumentsHandler({
      documentsService: this.documentsService,
      pageNumberKey: 'pageNumber',
    }),
    recentDocs: new RecentDocumentsHandler({
      documentsService: this.documentsService,
      pageNumberKey: 'pageNumber',
    }),
    docsByTags: new DocumentsByTagsHandler({
      tagsService: this.tagsService,
      tagsKey: 'tags',
    }),
    tags: new TagsHandler({
      tagsService: this.tagsService,
    }),
  } as const;

  public readonly router: Router;

  private readonly notFoundHandler: IHandler = {
    handle(_, response) {
      const error = new NotFoundError('No such endpoint');
      response.status(error.HTTPCode).json(error);
    },
  };

  public constructor() {
    const handlers = this.handlers;
    this.router = new Router({
      notFoundHandler: this.notFoundHandler,
    })
      .addHandler('GET', '/v1/configuration', handlers.configuration)
      .addHandler('GET', '/v1/documents/all/{pageNumber}', handlers.docs)
      .addHandler('GET', '/v1/documents/recent/{pageNumber}', handlers.recentDocs)
      .addHandler('GET', '/v1/documents/tags/{tags}', handlers.docsByTags)
      .addHandler('GET', '/v1/tags', handlers.tags);
  }
}
