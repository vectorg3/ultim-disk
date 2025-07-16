export interface IFileCreateDto {
  name: string;
  type: string;
  parent?: string;
}

export enum FileCreateType {
  directory = 'dir',
  file = 'file'
}
export const FileCreateTypeTitle = new Map<FileCreateType, string>([
  [FileCreateType.directory, 'Type directory name'],
  [FileCreateType.file, 'Type file name'],
])
