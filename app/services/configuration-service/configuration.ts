export interface IPublicConfiguration {
  urls: {
    pageViewBaseUrl: string;
  };
  contacts: {
    email: string | null;
  };
}

export interface IPrivateConfiguration {
  urls: {
    documentsBaseUrl: string;
    tagsBaseUrl: string;
  };
}
