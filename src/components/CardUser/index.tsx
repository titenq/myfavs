import { useNavigate } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';

import styles from '@/components/CardUser/CardUser.module.css';
import { ICardUserProps } from '@/interfaces/userInterface';

const CardUser = (props: ICardUserProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${props.name}`);
  };

  return (
    <Card className={styles.card_user_container} onClick={handleClick}>
      <Card.Body className={styles.card_user_body}>
        <Card.Title className={styles.card_user_name}>
          <FaUser size={14} /> {props.name}
        </Card.Title>
        <Card.Text className={styles.card_user_qtd_links}>
          <span className={styles.card_user_count}>
            {props.qtdLinks} {props.qtdLinks <= 1 ? 'link' : 'links'}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardUser;