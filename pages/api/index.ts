import { VercelRequest, VercelResponse } from '@vercel/node';
import { HttpError } from '../../lib/errors';
import { Router } from '../../lib/router';

const router = new Router({
  notFound(req, res) {
    res.json(new HttpError(404, 'Not Found'));
  },
})
  .addHandler('GET', '/first/second/third', (req, res) => {
    res.send('/first/second/third');
  })
  .addHandler('GET', '/foo/{bar}/baz', (req, res) => {
    res.json(req.query);
  });

export default function ApiHandler(
  request: VercelRequest,
  response: VercelResponse
) {
  const p = new Array<string>().concat(request.query.p || [])[0];
  if (p === undefined) {
    return response.send(new HttpError(404, 'NotFound'));
  }

  const handler = router.vercelHandler(request.method || 'GET', p);

  handler(request, response);
}
