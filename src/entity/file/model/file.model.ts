export interface IFileModel {
  _id: string;
  name: string;
  path: string;
  parent?: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  size: number;
  type: FileType;

  backDir?: boolean;
}

export interface IFileStackItem {
  _id: string;
  name: string;
}

export enum FileType {
  dir = 'dir',
}
