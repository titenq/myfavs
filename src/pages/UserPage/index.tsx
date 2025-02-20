import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { FcFolder, FcOpenedFolder } from 'react-icons/fc';

import styles from '@/pages/UserPage/UserPage.module.css';
import { IFolder, ILinkBody } from '@/interfaces/userFoldersInterface';
import CardLink from '@/components/CardLink';
import ModalError from '@/components/ModalError';
import { useLocation, useParams } from 'react-router-dom';
import getPublicFoldersByUserId from '@/api/userFolders/getPublicFoldersByUserId';
import getUserById from '@/api/user/getUserById';

const UserPage = () => {
  const { userId } = useParams();
  const { state } = useLocation();
  const [username, setUsername] = useState(state?.username || '');
  const [userFolders, setUserFolders] = useState<IFolder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openFolderId, setOpenFolderId] = useState('');
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userFolderName, setUserFolderName] = useState<string>('');
  const [activeSubfolderName, setActiveSubfolderName] = useState<string>('');
  const [activeSubfolderLinks, setActiveSubfolderLinks] = useState<ILinkBody[]>([]);

  const handleModalErrorClose = () => setShowModalError(false);

  useEffect(() => {
    const getFolders = async () => {
      setIsLoading(true);

      if (!username) {
        const userResponse = await getUserById(userId!);

        if (!('error' in userResponse)) {
          setUsername(userResponse.name);
        }
      }

      const response = await getPublicFoldersByUserId(userId!);

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
  }, [userId, username]);

  const handleFolderClick = (folderId: string, folderName: string) => {
    setOpenFolderId(openFolderId === folderId ? '' : folderId);
    setUserFolderName(openFolderId === folderId ? '' : folderName);
    setActiveSubfolderName('');
    setActiveSubfolderLinks([]);
  };

  const handleShowSubfolderLinks = (folderId: string, subfolderName: string) => {
    const folder = userFolders.find(folder => folder._id === folderId);
    const subfolder = folder?.subfolders?.find(sub => sub.name === subfolderName);

    setActiveSubfolderName(activeSubfolderName === subfolderName ? '' : subfolderName);
    setActiveSubfolderLinks(subfolder?.links || []);
  };

  return (
    <Container className={styles.container}>
      {isLoading && <p>Carregando as pastas do usuário...</p>}

      {userFolders && (
        <div className={styles.layout_container}>
          <aside className={styles.sidebar}>
            <div className={styles.user_container}>
              <p className={styles.user}>{username}</p>
            </div>

            {userFolders.map(folder => (
              <div key={folder._id}>
                <div
                  className={styles.folder_container}
                  onClick={() => handleFolderClick(folder._id, folder.name)}
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
            <div className={styles.folder_name}>
              {userFolderName}
              
              {activeSubfolderName && (
                <>
                  <div>|</div>
                  <div>{activeSubfolderName}</div>
                </>
              )}
            </div>

            {userFolders.map(folder => (
              openFolderId === folder._id && (
                <div key={folder._id}>
                  {folder?.subfolders && folder?.subfolders?.length > 0 && (
                    <div className={styles.subfolders_container}>
                      {folder?.subfolders.map(subfolder => (
                        <div
                          key={subfolder.name}
                          className={styles.subfolder_icon_container}
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
                          onDelete={() => { }}
                          showDeleteIcon={false}
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
                    onDelete={() => { }}
                    showDeleteIcon={false}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      )}

      <ModalError
        showModalError={showModalError}
        handleModalErrorClose={handleModalErrorClose}
        errorMessage={errorMessage}
      />
    </Container>
  );
};

export default UserPage;
