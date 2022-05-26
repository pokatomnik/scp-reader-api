import { Router } from '../lib/router';
import { HttpError } from '../lib/errors';
import { getAllDocuments } from './controllers/get.documents.all';
import { getDocumentsByTags } from './controllers/get.documents.bytags';
import { getRecentDocuments } from './controllers/get.documents.recent';
import { getTags } from './controllers/get.tags';

export const router = new Router({
  notFound(_, response) {
    response.json(new HttpError(404, 'NOT_FOUND', 'No such endpoint'));
  },
})
  .addHandler('GET', '/v1/documents/all/{pageNumber}', getAllDocuments)
  .addHandler('GET', '/v1/docuemtns/recent/{pageNumber}', getRecentDocuments)
  .addHandler('GET', '/v1/documents/tags/{tags}', getDocumentsByTags)
  .addHandler('GET', '/v1/tags', getTags);
