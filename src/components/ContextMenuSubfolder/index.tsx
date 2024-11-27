import { FaRegEdit } from 'react-icons/fa';
import { FaLink, FaRegTrashCan } from 'react-icons/fa6';
import { IoCloseCircleSharp } from 'react-icons/io5';

import styles from '@/components/ContextMenuSubfolder/ContextMenuSubfolder.module.css';
import { IContextMenuSubfolderProps } from '@/interfaces/contextMenu';

const ContextMenuSubfolder = (props: IContextMenuSubfolderProps) => {
  return (
    <div
      key={props.folder._id}
      className={styles.context_menu_container}
      style={{
        top: props.subfolderContextMenuPosition.y,
        left: props.subfolderContextMenuPosition.x
      }}
    >
      <div className={styles.context_menu_close_icon}>
        <IoCloseCircleSharp size={24} onClick={props.handleCloseContextMenuSubfolder} />
      </div>

      <div className={styles.context_menu_options}>
        <div
          className={styles.context_menu_option}
          onClick={() => props.handleSubfolderAddLink(props.folder._id, props.subfolderName)}
        >
          <FaLink size={18} />
          adicionar link na pasta {props.folder.name}
        </div>

        <div
          className={styles.context_menu_option}
          onClick={() => alert(`Editando a Div ${props.folder._id}`)}
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

export default ContextMenuSubfolder;
