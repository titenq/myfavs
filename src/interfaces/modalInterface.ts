export interface IModalAddFolder {
  showModal: boolean;
  folderName: string;
  isLoading: boolean;
  closeModal: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
