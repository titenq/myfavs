import { Container, Image } from 'react-bootstrap';

import styles from '@/pages/RegisteredSuccessfully/RegisteredSuccessfully.module.css';
import logo from '@/assets/img/myfavs.png';

const RegisteredSuccessfully = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={logo} width={255} height={231} fluid className={styles.logo} />
        <div>
          <p className={styles.title}>
            cadastro realizado com sucesso!
          </p>
          <p className={styles.title}>
            enviamos um e-mail de confirmação para você
          </p>
          <p className={styles.title}>
            clique no link para concluir seu cadastro
          </p>
          <p className={styles.title}>
            link válido por 24 horas
          </p>
        </div>
      </div>
    </Container>
  );
};

export default RegisteredSuccessfully;
