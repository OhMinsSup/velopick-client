import { TagItemModel } from "../common/common.dto";

export interface UserTagKeywordSearchModel {
  data: UserTagModel[];
}

export interface UserTagModel extends TagItemModel {}
