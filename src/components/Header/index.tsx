import {
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas
} from 'react-bootstrap';

import styles from '@/components/Header/Header.module.css';
import logo from '@/assets/img/myfavs.png';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';
import ModalError from '../ModalError';

const Header = () => {
  const { isLoggedIn, logout, error } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModalError, setShowModalError] = useState<boolean>(false);

  const handleModalErrorClose = () => setShowModalError(false);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setShowModalError(true);
    }
  }, [error]);

  return (
    <Navbar
      sticky='top'
      variant='dark'
      className={styles.navbar}
      expand='sm'
    >
      <Container fluid>
        <Navbar.Brand className={styles.brand} href='/'>
          <Image
            width={85.4}
            height={77.4}
            src={logo}
            fluid
            className={styles.logo_header}
          />
          <div className={styles.link}>myfavs</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvas' />
        <Navbar.Offcanvas
          id='offcanvas'
          aria-labelledby='offcanvas_label'
          placement='top'
          className={styles.offcanvas}
        >
          <Offcanvas.Header closeButton closeVariant='white'>
            <Offcanvas.Title id='offcanvas_label'>
              menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {!isLoggedIn && (
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link href='/login' className={styles.link}>login</Nav.Link>
              </Nav>
            )}

            {isLoggedIn && (
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <Nav.Link className={styles.link} onClick={logout}>logout</Nav.Link>
              </Nav>
            )}

          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>

      <ModalError
        showModalError={showModalError}
        handleModalErrorClose={handleModalErrorClose}
        errorMessage={errorMessage}
      />
    </Navbar>
  );
};

export default Header;
