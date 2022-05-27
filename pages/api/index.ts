import { VercelRequest, VercelResponse } from '@vercel/node';
import { Application } from '../../app/app';
import { NotFoundError } from '../../app/errors';

export default function ApiHandler(request: VercelRequest, response: VercelResponse) {
  const [path] = new Array<string>().concat(request.query.p || []);
  if (path === undefined) {
    return response.send(new NotFoundError('Specify requested path (query param "p")'));
  }

  const handler = new Application().router.vercelHandler(request.method || 'GET', path);

  handler(request, response);
}
