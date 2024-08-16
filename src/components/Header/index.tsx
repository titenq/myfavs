import {
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas
} from 'react-bootstrap';

import styles from './Header.module.css';
import logo from '../../assets/img/myfavs-128.png';

const Header = () => {
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
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link href='/login' className={styles.link}>login</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
