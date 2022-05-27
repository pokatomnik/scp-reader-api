import type { IDocument } from '../../../domain/document';
import { Parser } from '../../../lib/parser';
import { load } from 'cheerio';

export class RecentDocumentsParser extends Parser<Array<IDocument>> {
  public parse(html: string) {
    return [];
  }
}
