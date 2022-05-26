import { VercelRequest, VercelResponse } from '@vercel/node';
import { HttpError } from '../../lib/errors';
import { router } from '../../app/app';

export default function ApiHandler(
  request: VercelRequest,
  response: VercelResponse
) {
  const p = new Array<string>().concat(request.query.p || [])[0];
  if (p === undefined) {
    return response.send(
      new HttpError(
        404,
        'NOT_FOUND',
        'Specify requested path (query param "p")'
      )
    );
  }

  const handler = router.vercelHandler(request.method || 'GET', p);

  handler(request, response);
}
