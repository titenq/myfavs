import { useContext, useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { FaFolderPlus } from 'react-icons/fa6';

import styles from '@/pages/Admin/Admin.module.css';
import AuthContext from '@/context/AuthContext';
import { IFolder } from '@/interfaces/userFoldersInterface';
import getUserFoldersByUserId from '@/api/userFolders/getUserFoldersByUserId';
import ModalError from '@/components/ModalError';
import ModalAddFolder from '@/components/ModalAddFolder';
import createUserFolder from '@/api/userFolders/createUserFolder';
import ModalAddLink from '@/components/ModalAddLink';
import { Actions } from '@/enums/actions';
import createLink from '@/api/userFolders/createLink';
import ModalAddSubfolder from '@/components/ModalAddSubfolder';
import createUserSubfolder from '@/api/userFolders/createUserSubfolder';
import formatUrl from '@/helpers/formatUrl';
import { urlValidator } from '@/helpers/validators';
import ContextMenu from '@/components/ContextMenu';
import ContextMenuSubfolder from '@/components/ContextMenuSubfolder';
import CardLink from '@/components/CardLink';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [action, setAction] = useState<Actions | null>(null);
  const [userFolders, setUserFolders] = useState<IFolder[]>([]);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openFolderId, setOpenFolderId] = useState('');
  const [showModalAddFolder, setShowModalAddFolder] = useState<boolean>(false);
  const [showModalAddLink, setShowModalAddLink] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [addLinkValues, setAddLinkValues] = useState({
    url: '',
    isPrivate: false,
    description: '',
  });
  const [addLinkFolderId, setAddLinkFolderId] = useState<string | null>(null);
  const [userFolderName, setUserFolderName] = useState<string>('');
  const [subfolderName, setSubfolderName] = useState<string>('');
  const [addSubfolderId, setAddSubfolderId] = useState<string | null>(null);
  const [showModalAddSubfolder, setShowModalAddSubfolder] = useState<boolean>(false);

  const [subfolderContextMenuVisible, setSubfolderContextMenuVisible] = useState<boolean>(false);
  const [subfolderContextMenuPosition, setSubfolderContextMenuPosition] = useState({ x: 0, y: 0 });

  const handleModalErrorClose = () => setShowModalError(false);
  const handleModalAddFolderClose = () => setShowModalAddFolder(false);
  const handleModalAddLinkClose = () => setShowModalAddLink(false);
  const handleModalAddSubfolderClose = () => setShowModalAddSubfolder(false);

  useEffect(() => {
    const getFolders = async () => {
      setIsLoading(true);

      const response = await getUserFoldersByUserId(user?._id || '');

      if ('error' in response) {
        setErrorMessage(response.message);
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      setUserFolders(response?.folders);
      setIsLoading(false);
    };

    getFolders();
  }, [user?._id, isRefresh]);

  const handleFolderClick = (folderId: string, folderName: string) => {
    setOpenFolderId(openFolderId === folderId ? '' : folderId);
    setUserFolderName(openFolderId === folderId ? '' : folderName);
  };

  const handleAddFolder = () => {
    setAction(Actions.ADD_FOLDER);
    setShowModalAddFolder(true);
  };

  const handleAddLink = (folderId: string) => {
    setAction(Actions.ADD_LINK);
    setAddLinkFolderId(folderId);
    setShowModalAddLink(true);
  };

  const handleAddSubfolder = (folderId: string) => {
    setAction(Actions.ADD_SUBFOLDER);
    setAddSubfolderId(folderId);
    setShowModalAddSubfolder(true);
  };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, folderId: string) => {
    event.preventDefault();

    setContextMenuVisible(true);
    setContextMenuPosition({ x: event.pageX + 50, y: event.pageY - 25 });
    setActiveFolder(folderId);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
    setActiveFolder(null);
  };

  const handleAddLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddLinkValues({
      ...addLinkValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowSubfolderLinks = (folderId: string, subfolderName: string) => {
    console.log(folderId);
    console.log(subfolderName);
  };

  const handleSubfolderContextMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    folderId: string,
    subfolderName: string
  ) => {
    event.preventDefault();

    setSubfolderContextMenuVisible(true);
    setSubfolderContextMenuPosition({ x: event.pageX + 50, y: event.pageY - 25 });
    setActiveFolder(folderId);
    setSubfolderName(subfolderName);

    console.log(folderId, subfolderName);
  };

  const handleCloseContextMenuSubfolder = () => {
    setSubfolderContextMenuVisible(false);
    setActiveFolder(null);
    setSubfolderName('');
  };

  const handleSubfolderAddLink = (folderId: string, subfolderName: string) => {
    setAction(Actions.ADD_LINK);
    setAddLinkFolderId(folderId);
    setShowModalAddLink(true);

    console.log(folderId, subfolderName);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    if (action === Actions.ADD_FOLDER && user?._id) {
      if (!folderName) {
        setErrorMessage('nome da pasta é obrigatório');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      if (folderName?.length > 16) {
        setErrorMessage('o nome da pasta deve ter no máximo 16 caracteres');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const foldersName = userFolders.map(folder => folder.name);

      if (foldersName.includes(folderName)) {
        setErrorMessage('Já existe uma pasta com esse nome');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const response = await createUserFolder(user._id, folderName);

      if ('error' in response) {
        setErrorMessage(response.message);
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      setIsLoading(false);
      setShowModalAddFolder(false);
      setFolderName('');
      setIsRefresh(!isRefresh);
    }

    if (action === Actions.ADD_SUBFOLDER && user?._id && addSubfolderId) {
      if (!subfolderName) {
        setErrorMessage('nome da subpasta é obrigatório');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      if (subfolderName?.length > 16) {
        setErrorMessage('o nome da subpasta deve ter no máximo 16 caracteres');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const subfoldersName = userFolders.flatMap(folder => folder.subfolders?.map(subfolder => subfolder.name) ?? []);

      if (subfoldersName.includes(subfolderName)) {
        setErrorMessage('Já existe uma subpasta com esse nome');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const response = await createUserSubfolder(user._id, subfolderName, addSubfolderId);

      if ('error' in response) {
        setErrorMessage(response.message);
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      setIsLoading(false);
      setShowModalAddSubfolder(false);
      setSubfolderName('');
      setAddSubfolderId(null);
      setIsRefresh(!isRefresh);
    }

    if (action === Actions.ADD_LINK && user?._id && addLinkFolderId) {
      if (!addLinkValues.url) {
        setErrorMessage('url é obrigatório');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      addLinkValues.url = formatUrl(addLinkValues.url);

      if (!urlValidator(addLinkValues.url)) {
        setErrorMessage('url inválida');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      if (!addLinkValues.isPrivate) {
        setErrorMessage('marque se o link é público ou privado');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const folder = userFolders.find(folder => folder._id === addLinkFolderId);
      const urls = folder?.links?.map(item => item.url) || [];

      if (urls.includes(addLinkValues.url)) {
        setErrorMessage('Já existe um link com essa URL');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const response = await createLink(user._id, addLinkValues, addLinkFolderId);

      if ('error' in response) {
        setErrorMessage(response.message);
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      setIsLoading(false);
      setShowModalAddLink(false);
      setAddLinkValues({ url: '', isPrivate: false, description: '' });
      setAddLinkFolderId(null);
      setIsRefresh(!isRefresh);
    }
  };

  return (
    <Container className={styles.container} onClick={handleCloseContextMenu}>
      {isLoading && <p>Carregando as pastas do usuário...</p>}

      {userFolders && (
        <div className={styles.layout_container}>
          <aside className={styles.sidebar}>
            <div className={styles.user_container}>
              <p className={styles.user}>{user?.name}</p>

              <FaFolderPlus
                size={22}
                className={styles.cursor_pointer}
                onClick={handleAddFolder}
              />
            </div>

            {userFolders.map(folder => (
              <div
                key={folder._id}
                className={styles.folder_container}
                onClick={() => handleFolderClick(folder._id, folder.name)}
                onContextMenu={event => handleContextMenu(event, folder._id)}
              >
                {openFolderId === folder._id ? (
                  <FcOpenedFolder size={34} />
                ) : (
                  <FcFolder size={34} />
                )}

                <span>{folder.name}</span>
              </div>
            ))}
          </aside>

          <main className={styles.main_content}>
            <h2 className={styles.folder_name}>{userFolderName}</h2>

            {userFolders.map(folder => (
              openFolderId === folder._id && (
                <div key={folder._id}>
                  {folder?.subfolders && folder?.subfolders?.length > 0 && (
                    <div className={styles.subfolders_container}>
                      {folder?.subfolders.map(subfolder => (
                        <div
                          key={subfolder.name}
                          className={styles.subfolder_icon_container}
                          onContextMenu={(event: React.MouseEvent<HTMLHeadingElement>) => handleSubfolderContextMenu(event, folder._id, subfolder.name)}
                        >
                          <FcFolder
                            size={34}
                            className={styles.cursor_pointer}
                            onClick={() => handleShowSubfolderLinks(folder._id, subfolder.name)}
                          />
                          <h2 
                            className={styles.link_description}
                          >
                            {subfolder.name}
                          </h2>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={styles.folder_content}>
                    {folder?.links && folder?.links?.length > 0 && folder?.links.map(link => (
                      <CardLink key={link._id} link={link} />
                    ))}
                  </div>
                </div>
              )
            ))}

            {userFolders.map(folder => (
              activeFolder === folder._id && contextMenuVisible && (
                <ContextMenu
                  key={folder._id}
                  folder={folder}
                  contextMenuPosition={contextMenuPosition}
                  handleCloseContextMenu={handleCloseContextMenu}
                  handleAddSubfolder={handleAddSubfolder}
                  handleAddLink={handleAddLink}
                />
              )
            ))}

            {userFolders.map(folder => (
              activeFolder === folder._id && subfolderContextMenuVisible && (
                <ContextMenuSubfolder
                  key={folder._id}
                  folder={folder}
                  subfolderName={subfolderName}
                  subfolderContextMenuPosition={subfolderContextMenuPosition}
                  handleCloseContextMenuSubfolder={handleCloseContextMenuSubfolder}
                  handleSubfolderAddLink={handleSubfolderAddLink}
                />
              )
            ))}
          </main>
        </div>
      )}

      <ModalError
        showModalError={showModalError}
        handleModalErrorClose={handleModalErrorClose}
        errorMessage={errorMessage}
      />

      <ModalAddFolder
        showModal={showModalAddFolder}
        closeModal={handleModalAddFolderClose}
        onSubmit={handleSubmit}
        onChange={event => setFolderName(event.target.value)}
        folderName={folderName}
        isLoading={isLoading}
      />

      <ModalAddSubfolder
        showModal={showModalAddSubfolder}
        closeModal={handleModalAddSubfolderClose}
        onSubmit={handleSubmit}
        onChange={event => setSubfolderName(event.target.value)}
        subfolderName={subfolderName}
        isLoading={isLoading}
      />

      <ModalAddLink
        showModal={showModalAddLink}
        closeModal={handleModalAddLinkClose}
        onSubmit={handleSubmit}
        onChange={handleAddLinkChange}
        isLoading={isLoading}
        url={addLinkValues?.url}
        isPrivate={addLinkValues?.isPrivate}
        description={addLinkValues?.description}
      />
    </Container>
  );
};

export default Admin;
