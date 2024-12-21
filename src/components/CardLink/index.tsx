import { Image } from 'react-bootstrap';
import { FaLock } from 'react-icons/fa';

import styles from '@/components/CardLink/CardLink.module.css';
import noScreenshot from '@/assets/img/no-screenshot.webp';
import { ICardLinkProps } from '@/interfaces/userFoldersInterface';

const CardLink = (props: ICardLinkProps) => {
  return (
    <div className={styles.links_container}>
      {props.link?.picture ? (
        <Image
          src={`http://localhost:3300${props.link?.picture}`}
          alt='screenshot'
          crossOrigin="anonymous"
          className={styles.screenshot}
        />
      ) : (
        <Image
          src={noScreenshot}
          alt='no screenshot'
          className={styles.screenshot}
        />
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
