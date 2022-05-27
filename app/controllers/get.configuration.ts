import type { VercelResponse } from '@vercel/node';
import type { IHandler } from '../../lib/router';
import type { ConfigurationService } from '../services/configuration-service';

export class ConfugurationHandler implements IHandler {
  public constructor(private readonly params: { configurationService: ConfigurationService }) {}

  public handle(_: unknown, response: VercelResponse) {
    response.json(this.params.configurationService.getPublicConfiguration());
  }
}
