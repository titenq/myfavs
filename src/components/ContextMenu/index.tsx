import { FaRegEdit } from 'react-icons/fa';
import { FaLink, FaRegTrashCan } from 'react-icons/fa6';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { LuFolderPlus } from 'react-icons/lu';

import styles from '@/components/ContextMenu/ContextMenu.module.css';
import { IContextMenuProps } from '@/interfaces/contextMenu';

const ContextMenu = (props: IContextMenuProps) => {
  return (
    <div
      key={props.folder._id}
      className={styles.context_menu_container}
      style={{
        top: props.contextMenuPosition.y,
        left: props.contextMenuPosition.x
      }}
    >
      <div className={styles.context_menu_close_icon}>
        <IoCloseCircleSharp
          size={24}
          onClick={props.handleCloseContextMenu}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <div className={styles.context_menu_options}>
        <div
          className={styles.context_menu_option}
          onClick={() => props.handleAddSubfolder(props.folder._id)}
        >
          <LuFolderPlus size={20} />
          adicionar subpasta na pasta {props.folder.name}
        </div>

        <div
          className={styles.context_menu_option}
          onClick={() => props.handleAddLink(props.folder._id)}
        >
          <FaLink size={18} />
          adicionar link na pasta {props.folder.name}
        </div>

        <div
          className={styles.context_menu_option}
          onClick={() => props.handleEditFolder(props.folder.name, props.folder._id)}
        >
          <FaRegEdit size={18} />
          editar o nome da pasta {props.folder.name}
        </div>

        <div
          className={styles.context_menu_option}
          onClick={() => alert(`Deletando a Div ${props.folder._id}`)}
        >
          <FaRegTrashCan size={18} />
          deletar pasta {props.folder.name}
        </div>
      </div>
    </div>
  );
};

export default ContextMenu;
