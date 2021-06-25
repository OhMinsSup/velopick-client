import { TagItemModel } from "../common/common.dto";

export interface TagKeywordSearhModel {
  data: TagModel[];
}

export interface TagModel extends TagItemModel {
  count?: number;
}
