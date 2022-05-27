export interface ITag {
  name: string;
}

export interface PageByTags {
  all_tags: Array<string>;
  id: string;
  matchedTags: number;
  name: string;
  title: string;
}
