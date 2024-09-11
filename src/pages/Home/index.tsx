import { Container, Image } from 'react-bootstrap';

import styles from '@/pages/Home/Home.module.css';
import logo from '@/assets/img/myfavs.png';

const Home = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={logo} width={255} height={231} fluid className={styles.logo} />

        <div>
          <p className={styles.title}>
            salve seus links em um só lugar
          </p>

          <p className={styles.subtitle}>
            organize e acesse seus links favoritos facilmente
          </p>
          <p className={styles.subtitle}>
            crie uma conta para salvar e gerenciar seus links, escolhendo se deseja torná-los privados ou públicos
          </p>
          <p className={styles.subtitle}>
            mesmo sem se logar, qualquer pessoa pode explorar e visualizar os links públicos
          </p>
          <p className={styles.subtitle}>
            mantenha tudo ao seu alcance com apenas alguns cliques
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Home;
