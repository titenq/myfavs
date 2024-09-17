import { Container, Image } from 'react-bootstrap';

import styles from '@/pages/ForgotPasswordOk/ForgotPasswordOk.module.css';
import logo from '@/assets/img/myfavs.png';

const ForgotPasswordOk = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={logo} width={255} height={231} fluid className={styles.logo} />
        <div>
          <p className={styles.title}>
            e-mail enviado com sucesso!
          </p>
          <p className={styles.title}>
            enviamos um e-mail de confirmação para você
          </p>
          <p className={styles.title}>
            clique no link para recadastrar a sua senha
          </p>
          <p className={styles.title}>
            link válido por 24 horas
          </p>
        </div>
      </div>
    </Container>
  );
};

export default ForgotPasswordOk;
