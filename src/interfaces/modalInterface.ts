export interface IModal {
  showModal: boolean;
  title: string;
  folderName: string;
  isLoading: boolean;
  closeModal: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
