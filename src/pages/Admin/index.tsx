import { useContext, useEffect, useState } from 'react';

import { FcFolder, FcOpenedFolder } from 'react-icons/fc';
import { FaFolderPlus } from 'react-icons/fa6';

import styles from '@/pages/Admin/Admin.module.css';
import AuthContext from '@/context/AuthContext';
import { IFolder } from '@/interfaces/userFoldersInterface';
import getUserFoldersByUserId from '@/api/userFolders/getUserFoldersByUserId';
import ModalError from '@/components/ModalError';
import ModalForm from '../../components/ModalForm/index';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [userFolders, setUserFolders] = useState<IFolder[]>([]);
  const [showModalError, setShowModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFolderOpen, setIsFolderOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [folderName, setFolderName] = useState<string>('');

  const handleModalErrorClose = () => setShowModalError(false);
  const handleModalClose = () => setShowModal(false);

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
  }, [user?._id]);

  const handleFolderClick = () => {
    setIsFolderOpen(!isFolderOpen);
  };

  const handleAddFolder = async () => {
    setShowModal(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(folderName);
  };

  return (
    <div className={styles.container}>
      {isLoading && <p>Carregando as pastas do usuário...</p>}
      {userFolders && (
        <div className={styles.folders_container}>
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
              onClick={handleFolderClick}
            >
              {isFolderOpen ? <FcOpenedFolder size={34} /> : <FcFolder size={34} />}
              <span>{folder.name}</span>
              
              {isFolderOpen && (
                <div className={styles.folder_content}>
                  {folder?.links && folder?.links?.length > 0 && (
                    <div className={styles.links_container}>
                      <h4>Links:</h4>
                      {folder?.links.map(link => (
                        <div key={link._id}>{link.url}</div>
                      ))}
                    </div>
                  )}
                  
                  {folder?.subfolders && folder?.subfolders?.length > 0 && (
                    <div className={styles.subfolders_container}>
                      <h4>Subfolders:</h4>
                      {folder?.subfolders.map(subfolder => (
                        <div key={subfolder._id}>{subfolder.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ModalError
        showModalError={showModalError}
        handleModalErrorClose={handleModalErrorClose}
        errorMessage={errorMessage}
      />

      <ModalForm
        showModal={showModal}
        closeModal={handleModalClose}
        title="Adicionar pasta"
        onSubmit={handleSubmit}
        onChange={event => setFolderName(event.target.value)}
        folderName={folderName}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Admin;
