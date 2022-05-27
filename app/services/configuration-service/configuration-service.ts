import type {
  IPublicConfiguration,
  IPrivateConfiguration,
} from './configuration';

export class ConfigurationService {
  private static paths = {
    DOCUMENT_VIEW_BASE_URL: 'http://scpfoundation.net/',
    DOCUMENT_BASE_URL: 'http://scp-ru.wikidot.com',
    TAGS_BASE_URL: 'https://m.scpfoundation.net',
  };

  public getPrivateConfiguration(): IPrivateConfiguration {
    return {
      urls: {
        documentsBaseUrl: ConfigurationService.paths.DOCUMENT_BASE_URL,
        tagsBaseUrl: ConfigurationService.paths.TAGS_BASE_URL,
      },
    };
  }

  public getPublicConfiguration(): IPublicConfiguration {
    return {
      urls: {
        pageViewBaseUrl: ConfigurationService.paths.DOCUMENT_VIEW_BASE_URL,
      },
    };
  }
}
