export interface TagKeywordSearhModel {
  data: TagModel[];
}

export interface TagModel {
  id: number;
  name: string;
  image: string;
  count: number;
}
