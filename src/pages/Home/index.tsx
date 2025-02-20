import { useEffect, useState } from 'react';

import { Container, Image } from 'react-bootstrap';

import styles from '@/pages/Home/Home.module.css';
import logo from '@/assets/img/myfavs.png';
import { ILinkBody } from '@/interfaces/userFoldersInterface';
import getLinks from '@/api/userFolders/getLinks';
import CardLink from '@/components/CardLink';

const Home = () => {
  const [links, setLinks] = useState<ILinkBody[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await getLinks();

      if (Array.isArray(response) && response.length > 0) {
        setLinks(response);
      }
    };

    fetchLinks();
  }, []);

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

      <div className={styles.links_container}>
        {links.map((link, i) => (
          <CardLink
            key={link.picture || i}
            link={link}
            onDelete={() => { }}
            showDeleteIcon={false}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
