export interface IContextMenuProps {
  folder: {
    _id: string;
    name: string;
  };
  contextMenuPosition: {
    x: number;
    y: number;
  };
  handleCloseContextMenu: () => void;
  handleAddSubfolder: (folderId: string) => void;
  handleAddLink: (folderId: string) => void;
  handleEditFolder: (olderFolderName: string, folderId: string) => void;
  handleDeleteFolder: (deleteFolderId: string) => void;
}

export interface IContextMenuSubfolderProps {
  folder: {
    _id: string;
    name: string;
  };
  subfolderContextMenuPosition: {
    x: number;
    y: number;
  };
  handleCloseContextMenuSubfolder: () => void;
  handleSubfolderAddLink: (folderId: string, subfolderName: string) => void;
  subfolderName: string;
}
