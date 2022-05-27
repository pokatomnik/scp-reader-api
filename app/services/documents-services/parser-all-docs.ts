import { IDocument, IDocumentsResponse } from '../../../domain/document';
import { Parser } from '../../../lib/parser';
import { load } from 'cheerio';

export class AllDocumentsParser extends Parser<IDocumentsResponse> {
  public parse(html: string): IDocumentsResponse {
    const $ = load(html);
    const $table = $('table.wiki-content-table');
    const $rows = $($table).find('tr');
    const length = $rows.length;

    const documents = new Array<IDocument>();

    for (let i = 1; i < length; ++i) {
      const [tdName, tdRating, tdAuthor, tdDate] = $($rows[i]).find('td').toArray();
      let name: string;
      let title: string;
      let rating: number | undefined = undefined;
      let author: string | undefined = undefined;
      let date: string | undefined = undefined;

      try {
        const anchor = $(tdName).find('a');
        const urlStr = anchor.attr('href');
        if (!urlStr) {
          continue;
        }
        const url = new URL(urlStr);
        name = url.pathname.replace('/', '');
        title = anchor.text();
      } catch (e) {
        continue;
      }

      try {
        const ratingStr = $(tdRating).text();
        if (ratingStr) {
          rating = Number.parseInt(ratingStr);
        }
      } catch (e) {}

      try {
        const authroStr = $(tdAuthor).text();
        if (authroStr) {
          author = authroStr;
        }
      } catch (e) {}

      try {
        const dateStr = $(tdDate).text();
        if (dateStr) {
          date = dateStr;
        }
      } catch (e) {}

      const document: IDocument = {
        name,
        title,
        rating,
        author,
        date,
      };
      documents.push(document);
    }

    const spanPageNo$ = $('span.pager-no');
    const paginationText = spanPageNo$.text();
    const [, , , maxPageStr] = paginationText.split(/\s/g);
    let maxPage: number = 1;
    try {
      const maxPageOptional =
        typeof maxPageStr === 'string' ? Number.parseInt(maxPageStr) : undefined;
      if (maxPageOptional !== undefined && !Number.isNaN(maxPageOptional)) {
        maxPage = maxPageOptional;
      }
    } catch (e) {
      maxPage = 1;
    }

    return {
      documents,
      maxPage,
    };
  }
}
