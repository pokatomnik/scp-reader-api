import { Router } from '../lib/router';
import { NotFoundError } from '../lib/errors';
import { makeAllDocumentsHandler } from './controllers/get.documents.all';
import { makeDocumentsByTagsHandler } from './controllers/get.documents.bytags';
import { makeRecentDocumentsHandler } from './controllers/get.documents.recent';
import { makeTagsHandler } from './controllers/get.tags';
import { makeDocumentHandler } from './controllers/get.document.byid';
import { HttpClient } from '../lib/http-client';

export class Application {
  private readonly httpClient = new HttpClient();

  public readonly router = new Router({
    notFound(_, response) {
      const error = new NotFoundError('No such endpoint');
      response.status(error.HTTPCode).json(error);
    },
  })
    .addHandler(
      'GET',
      '/v1/documents/all/{pageNumber}',
      makeAllDocumentsHandler({
        pageNumberKey: 'pageNumber',
        httpClient: this.httpClient,
      })
    )
    .addHandler(
      'GET',
      '/v1/documents/recent/{pageNumber}',
      makeRecentDocumentsHandler({
        pageNumberKey: 'pageNumber',
      })
    )
    .addHandler(
      'GET',
      '/v1/documents/{pageId}',
      makeDocumentHandler({ pageIdKey: 'pageId', httpClient: this.httpClient })
    )
    .addHandler(
      'GET',
      '/v1/documents/tags/{tags}',
      makeDocumentsByTagsHandler({ tagsKey: 'tags' })
    )
    .addHandler(
      'GET',
      '/v1/tags',
      makeTagsHandler({
        httpClient: this.httpClient,
      })
    );
}
