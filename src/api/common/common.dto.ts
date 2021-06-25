export type ClientResponse<Data = any> = {
  ok: boolean;
  statusCode: number;
  resultCode: number;
  message: string;
  data: Data;
};

export interface TagItemModel {
  id: number;
  name: string;
  image?: string;
}
