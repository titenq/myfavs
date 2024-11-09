import { useContext } from 'react';

import { Container } from 'react-bootstrap';

import AuthContext from '@/context/AuthContext';

const Admin = () => {
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <p>{user?.name}</p>
    </Container>
  );
};

export default Admin;
