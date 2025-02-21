import { useNavigate } from 'react-router-dom';

import { Image } from 'react-bootstrap';
import { FaLock, FaUser } from 'react-icons/fa';
import { RiCloseCircleFill } from 'react-icons/ri';

import styles from '@/components/CardLink/CardLink.module.css';
import noScreenshot from '@/assets/img/no-screenshot.webp';
import { ICardLinkProps } from '@/interfaces/userFoldersInterface';

const CardLink = (props: ICardLinkProps) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/user/${props.link.username}`);
  };

  return (
    <div className={styles.links_container}>
      {props.link?.username && (
        <div className={styles.username} onClick={handleUserClick}>
          <FaUser size={14} /> {props.link.username}
        </div>
      )}

      {props.showDeleteIcon && (
        <div className={styles.delete_icon}>
          <RiCloseCircleFill
            size={34}
            onClick={() => props.onDelete()}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )}

      {props.link?.picture ? (
        <a
          href={props.link.url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link_url}
        >
          <Image
            src={props.link?.picture}
            alt='screenshot'
            crossOrigin="anonymous"
            className={styles.screenshot}
          />
        </a>
      ) : (
        <a
          href={props.link.url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link_url}
        >
          <Image
            src={noScreenshot}
            alt='no screenshot'
            className={styles.screenshot}
          />
        </a>
      )}

      <div className={styles.link_container}>
        {props.link?.isPrivate && (
          <FaLock size={14} />
        )}
        <a
          href={props.link.url}
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link_url}
        >
          {props.link.url}
        </a>
      </div>

      {props.link?.description && (
        <h2 className={styles.link_description}>{props.link.description}</h2>
      )}
    </div>
  );
};

export default CardLink;