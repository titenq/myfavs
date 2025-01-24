export interface IModalAddFolder {
  showModal: boolean;
  folderName: string;
  isLoading: boolean;
  closeModal: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IModalAddSubfolder extends Omit<IModalAddFolder, 'folderName'> {
  subfolderName: string;
}

export interface IModalAddLink {
  showModal: boolean;
  url: string;
  description?: string | null;
  isPrivate: boolean;
  isLoading: boolean;
  closeModal: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IModalDeleteLink {
  showModal: boolean;
  isLoading: boolean;
  deleteLinkUrl: string;
  closeModal: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
