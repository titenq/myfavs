interface ILink {
  _id: string;
  url: string;
  picture?: string | null;
  description?: string | null;
  isPrivate: boolean;
}

export type ILinkBody = Omit<ILink, '_id'>;

export interface IFolder {
  _id: string;
  name: string;
  links?: ILink[] | null;
  subfolders?: IFolder[] | null;
}

export interface IUserFolder {
  _id: string;
  userId: string;
  folders: IFolder[];
  createdAt: Date;
}
