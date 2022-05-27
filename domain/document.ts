export interface IDocument {
  /**
   * Example: scp-173
   */
  name: string;

  /**
   * Example: SCP-173 - Скульптура
   */
  title: string;

  /**
   * Rating of this page
   */
  rating?: number;

  /**
   * Author of this page
   */
  author?: string;

  /**
   * Date this page created. Date-like string
   */
  date?: string;
}

export interface IDocumentsResponse {
  documents: Array<IDocument>;
  maxPage: number;
}
