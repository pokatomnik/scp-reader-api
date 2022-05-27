import axios from 'axios';
import { TagsClient } from './tags-client';
import { DocumentsClient } from './documents-client';

export class HttpClient {
  private static paths = {
    PAGES_BASE_URL: 'http://scp-ru.wikidot.com',
    TAGS_BASE_URL: 'https://m.scpfoundation.net',
  };

  private readonly documentsAxios = axios.create({
    baseURL: HttpClient.paths.PAGES_BASE_URL,
  });

  private readonly tagsAxios = axios.create({
    baseURL: HttpClient.paths.TAGS_BASE_URL,
  });

  public readonly documentsClient = new DocumentsClient({
    axios: this.documentsAxios,
    pagesBaseUrl: HttpClient.paths.PAGES_BASE_URL,
  });

  public readonly tagsClient = new TagsClient({
    axios: this.tagsAxios,
  });
}
