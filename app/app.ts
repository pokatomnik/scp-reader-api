import { Router } from '../lib/router';
import { HttpError } from '../lib/errors';
import { makeAllDocumentsHandler } from './controllers/get.documents.all';
import { makeDocumentsByTagsHandler } from './controllers/get.documents.bytags';
import { makeRecentDocumentsHandler } from './controllers/get.documents.recent';
import { makeTagsHandler } from './controllers/get.tags';

export const router = new Router({
  notFound(_, response) {
    response.json(new HttpError(404, 'NOT_FOUND', 'No such endpoint'));
  },
})
  .addHandler(
    'GET',
    '/v1/documents/all/{pageNumber}',
    makeAllDocumentsHandler({ pageNumber: 'pageNumber' })
  )
  .addHandler(
    'GET',
    '/v1/documents/recent/{pageNumber}',
    makeRecentDocumentsHandler({
      pageNumber: 'pageNumber',
    })
  )
  .addHandler(
    'GET',
    '/v1/documents/tags/{tags}',
    makeDocumentsByTagsHandler({ tags: 'tags' })
  )
  .addHandler('GET', '/v1/tags', makeTagsHandler());
