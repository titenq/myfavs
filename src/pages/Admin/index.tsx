import { useContext, useEffect, useState } from 'react';

import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { FaFolderPlus, FaLink, FaRegTrashCan } from 'react-icons/fa6';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { LuFolderPlus } from 'react-icons/lu';

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
import noScreenshot from '@/assets/img/no-screenshot.webp';
import { Image } from 'react-bootstrap';

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

  const handleModalErrorClose = () => setShowModalError(false);
  const handleModalAddFolderClose = () => setShowModalAddFolder(false);
  const handleModalAddLinkClose = () => setShowModalAddLink(false);

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

    if (action === Actions.ADD_LINK && user?._id && addLinkFolderId) {
      if (!addLinkValues.url) {
        setErrorMessage('url é obrigatório');
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
      setIsRefresh(!isRefresh);
    }
  };

  return (
    <div className={styles.container} onClick={handleCloseContextMenu}>
      {isLoading && <p>Carregando as pastas do usuário...</p>}

      {userFolders && (
        <div className={styles.layout_container}>
          <aside className={styles.sidebar}>
            <div className={styles.user_container}>
              <p className={styles.user}>{user?.name}</p>

              <FaFolderPlus
                size={22}
                className={styles.add_folder_icon}
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
            <div className={styles.folder_name}>{userFolderName}</div>

            {userFolders.map(folder => (
              openFolderId === folder._id && (
                <div key={folder._id} className={styles.folder_content}>
                  {folder?.links && folder?.links?.length > 0 && folder?.links.map(link => (
                    <div key={link._id} className={styles.links_container}>
                      <Image src={noScreenshot} alt='no screenshot' className={styles.screenshot} />

                      <a
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.link_url}
                      >
                        {link.url}
                      </a>

                      {link?.description && (
                        <div className={styles.link_description}>{link.description}</div>
                      )}
                    </div>
                  ))}
                  
                  {folder?.subfolders && folder?.subfolders?.length > 0 && (
                    <div className={styles.subfolders_container}>
                      <h4>Subfolders:</h4>
                      {folder?.subfolders.map(subfolder => (
                        <div key={subfolder._id}>{subfolder.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}

            {userFolders.map(folder => (
              activeFolder === folder._id && contextMenuVisible && (
                <div
                  key={folder._id}
                  className={styles.context_menu_container}
                  style={{
                    top: contextMenuPosition.y,
                    left: contextMenuPosition.x
                  }}
                >
                  <div className={styles.context_menu_close_icon}>
                    <IoCloseCircleSharp size={24} onClick={handleCloseContextMenu} />
                  </div>

                  <div className={styles.context_menu_options}>
                    <div
                      className={styles.context_menu_option}
                      onClick={() => alert(`Adicionar subpasta Div ${folder._id}`)}
                    >
                      <LuFolderPlus size={20} />
                      adicionar subpasta na pasta {folder.name}
                    </div>

                    <div
                      className={styles.context_menu_option}
                      onClick={() => handleAddLink(folder._id)}
                    >
                      <FaLink size={18} />
                      adicionar link na pasta {folder.name}
                    </div>

                    <div
                      className={styles.context_menu_option}
                      onClick={() => alert(`Editando a Div ${folder._id}`)}
                    >
                      <FaRegEdit size={18} />
                      editar o nome da pasta {folder.name}
                    </div>

                    <div
                      className={styles.context_menu_option}
                      onClick={() => alert(`Deletando a Div ${folder._id}`)}
                    >
                      <FaRegTrashCan size={18} />
                      deletar pasta {folder.name}
                    </div>
                  </div>
                </div>
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
    </div>
  );
};

export default Admin;
