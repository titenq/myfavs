import { useContext, useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { FaFolderPlus } from 'react-icons/fa6';

import styles from '@/pages/Admin/Admin.module.css';
import AuthContext from '@/context/AuthContext';
import { IDeleteLinkProps, IFolder, ILinkBody } from '@/interfaces/userFoldersInterface';
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
import createLinkSubfolder from '@/api/userFolders/createLinkSubfolder';
import ModalDeleteLink from '@/components/ModalDeleteLink';
import deleteLink from '@/api/userFolders/deleteLink';

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
  const [showModalDeleteLink, setShowModalDeleteLink] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [addLinkValues, setAddLinkValues] = useState({
    url: '',
    isPrivate: false,
    description: '',
    radioSelected: false,
    picture: ''
  });
  const [addLinkFolderId, setAddLinkFolderId] = useState<string | null>(null);
  const [userFolderName, setUserFolderName] = useState<string>('');
  const [subfolderName, setSubfolderName] = useState<string>('');
  const [addSubfolderId, setAddSubfolderId] = useState<string | null>(null);
  const [showModalAddSubfolder, setShowModalAddSubfolder] = useState<boolean>(false);

  const [subfolderContextMenuVisible, setSubfolderContextMenuVisible] = useState<boolean>(false);
  const [subfolderContextMenuPosition, setSubfolderContextMenuPosition] = useState({ x: 0, y: 0 });

  const [activeSubfolderName, setActiveSubfolderName] = useState<string>('');
  const [activeSubfolderLinks, setActiveSubfolderLinks] = useState<ILinkBody[]>([]);

  const [deleteLinkId, setDeleteLinkId] = useState<string | null>(null);
  const [deleteLinkFolderId, setDeleteLinkFolderId] = useState<string | null>(null);
  const [deleteLinkSubfolderName, setDeleteLinkSubfolderName] = useState<string | null>(null);
  const [deleteLinkUrl, setDeleteLinkUrl] = useState<string>('');
  const [deleteLinkPicture, setDeleteLinkPicture] = useState<string | null>(null);

  const handleModalErrorClose = () => setShowModalError(false);
  const handleModalAddFolderClose = () => setShowModalAddFolder(false);
  const handleModalAddLinkClose = () => setShowModalAddLink(false);
  const handleModalAddSubfolderClose = () => setShowModalAddSubfolder(false);
  const handleModalDeleteLinkClose = () => setShowModalDeleteLink(false);

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
    setActiveSubfolderName('');
    setActiveSubfolderLinks([]);
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
    const { name, value } = event.target;

    if (name === 'isPrivate') {
      setAddLinkValues({
        ...addLinkValues,
        [name]: value === 'false' ? false : true,
        radioSelected: true
      });

      return;
    }

    setAddLinkValues({
      ...addLinkValues,
      [name]: value
    });
  };

  const handleShowSubfolderLinks = (folderId: string, subfolderName: string) => {
    const folder = userFolders.find(folder => folder._id === folderId);
    const subfolder = folder?.subfolders?.find(sub => sub.name === subfolderName);

    setActiveSubfolderName(activeSubfolderName === subfolderName ? '' : subfolderName);
    setActiveSubfolderLinks(subfolder?.links || []);
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
  };

  const handleCloseContextMenuSubfolder = () => {
    setSubfolderContextMenuVisible(false);
    setActiveFolder(null);
    setSubfolderName('');
  };

  const handleSubfolderAddLink = (folderId: string, subfolderName: string) => {
    setAction(Actions.ADD_LINK);
    setAddLinkFolderId(folderId);
    setSubfolderName(subfolderName);
    setShowModalAddLink(true);
  };

  const handleDeleteLink = (deleteLinkProps: IDeleteLinkProps) => {
    setAction(Actions.DELETE_LINK);
    setDeleteLinkFolderId(deleteLinkProps.folderId);
    setDeleteLinkSubfolderName(deleteLinkProps.subfolderName);
    setDeleteLinkId(deleteLinkProps.linkId);
    setDeleteLinkUrl(deleteLinkProps.linkUrl);
    setDeleteLinkPicture(deleteLinkProps.linkPicture);
    setShowModalDeleteLink(true);
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

    if (action === Actions.ADD_LINK && user?._id) {
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

      if (!addLinkValues.radioSelected) {
        setErrorMessage('marque se o link é público ou privado');
        setShowModalError(true);
        setIsLoading(false);

        return;
      }

      const folder = userFolders.find(folder => folder._id === addLinkFolderId);

      if (subfolderName) {
        const subfolder = folder?.subfolders?.find(sub => sub.name === subfolderName);
        const subfoldersUrls = subfolder?.links?.map(item => item.url) || [];

        if (subfoldersUrls.includes(addLinkValues.url)) {
          setErrorMessage('Já existe um link com essa URL nesta subpasta');
          setShowModalError(true);
          setIsLoading(false);

          return;
        }

        const response = await createLinkSubfolder(user._id, addLinkValues, addLinkFolderId!, subfolderName);

        if ('error' in response) {
          setErrorMessage(response.message);
          setShowModalError(true);
          setIsLoading(false);

          return;
        }

        addLinkValues.picture = response.picture;

        setActiveSubfolderLinks([...activeSubfolderLinks, addLinkValues]);
      } else {
        const urls = folder?.links?.map(item => item.url) || [];

        if (urls.includes(addLinkValues.url)) {
          setErrorMessage('Já existe um link com essa URL');
          setShowModalError(true);
          setIsLoading(false);

          return;
        }

        const response = await createLink(user._id, addLinkValues, addLinkFolderId!);

        if ('error' in response) {
          setErrorMessage(response.message);
          setShowModalError(true);
          setIsLoading(false);

          return;
        }
      }

      setIsLoading(false);
      setShowModalAddLink(false);
      setAddLinkValues({
        url: '',
        isPrivate: false,
        description: '',
        radioSelected: false,
        picture: ''
      });
      setAddLinkFolderId(null);
      setSubfolderName('');
      setIsRefresh(!isRefresh);
    }

    if (action === Actions.DELETE_LINK) {
      if (user) {
        const response = await deleteLink(user._id, {
          folderId: deleteLinkFolderId,
          subfolderName: deleteLinkSubfolderName,
          linkId: deleteLinkId,
          linkUrl: deleteLinkUrl,
          linkPicture: deleteLinkPicture,
        });

        if ('error' in response) {
          setErrorMessage(response.message);
          setShowModalError(true);
          setIsLoading(false);

          return;
        }

        if (deleteLinkSubfolderName) {
          const folder = userFolders.find(folder => folder._id === deleteLinkFolderId);
          const subfolder = folder?.subfolders?.find(sub => sub.name === deleteLinkSubfolderName);
          
          setActiveSubfolderLinks(subfolder?.links?.filter(link => link.url !== deleteLinkUrl) || []);
        }
        
        setIsLoading(false);
        setShowModalDeleteLink(false);
        setIsRefresh(!isRefresh);
      }
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
              <div key={folder._id}>
                <div
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

                {openFolderId === folder._id && folder?.subfolders && (
                  <div className={styles.subfolder_list}>
                    {folder.subfolders.map(subfolder => (
                      <div
                        key={subfolder.name}
                        className={styles.subfolder_item}
                        onClick={() => handleShowSubfolderLinks(folder._id, subfolder.name)}
                        onContextMenu={(e) => handleSubfolderContextMenu(e, folder._id, subfolder.name)}
                      >
                        {activeSubfolderName === subfolder.name ? (
                          <FcOpenedFolder
                            size={28}
                            className={styles.cursor_pointer}
                            onClick={() => handleShowSubfolderLinks(folder._id, subfolder.name)}
                          />
                        ) : (
                          <FcFolder
                            size={28}
                            className={styles.cursor_pointer}
                            onClick={() => handleShowSubfolderLinks(folder._id, subfolder.name)}
                          />
                        )}
                        <span>{subfolder.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </aside>

          <main className={styles.main_content}>
            <h2 className={styles.folder_name}>
              {userFolderName}{activeSubfolderName && (` | ${activeSubfolderName}`)}
            </h2>

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
                          {activeSubfolderName === subfolder.name ? (
                            <FcOpenedFolder
                              size={28}
                              className={styles.cursor_pointer}
                              onClick={() => handleShowSubfolderLinks(folder._id, subfolder.name)}
                            />
                          ) : (
                            <FcFolder
                              size={28}
                              className={styles.cursor_pointer}
                              onClick={() => handleShowSubfolderLinks(folder._id, subfolder.name)}
                            />
                          )}
                          <h2 
                            className={styles.link_description}
                          >
                            {subfolder.name}
                          </h2>
                        </div>
                      ))}
                    </div>
                  )}

                  {!activeSubfolderName && (
                    <div className={styles.folder_content}>
                      {folder?.links && folder?.links?.length > 0 && folder?.links.map(link => (
                        <CardLink
                          key={link._id}
                          link={link}
                          onDelete={() => handleDeleteLink({
                            folderId: folder._id,
                            subfolderName: null,
                            linkId: link._id || null,
                            linkUrl: link.url,
                            linkPicture: link.picture || null,
                          })}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}

            {activeSubfolderName && (
              <div className={styles.folder_content}>
                {activeSubfolderLinks.map(link => (
                  <CardLink
                    key={link.url}
                    link={link}
                    onDelete={() => handleDeleteLink({
                      folderId: openFolderId,
                      subfolderName: activeSubfolderName,
                      linkId: null,
                      linkUrl: link.url,
                      linkPicture: link.picture || null
                    })}
                  />
                ))}
              </div>
            )}

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

      <ModalDeleteLink
        deleteLinkUrl={deleteLinkUrl}
        showModal={showModalDeleteLink}
        closeModal={handleModalDeleteLinkClose}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Admin;
