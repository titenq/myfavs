import { Link } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';

import styles from '@/pages/ResetPasswordOk/ResetPasswordOk.module.css';
import logo from '@/assets/img/myfavs.png';

const ResetPasswordOk = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={logo} width={255} height={231} fluid className={styles.logo} />
        <div>
          <p className={styles.title}>
            senha cadastrada com sucesso!
          </p>
          <p className={styles.title}>
            clique em <Link to="/login">login</Link> para entrar
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ResetPasswordOk;
