import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Container, Image } from 'react-bootstrap';

import styles from '@/pages/EmailVerified/EmailVerified.module.css';
import logo from '@/assets/img/myfavs.png';
import verifyEmail from '@/api/auth/verifyEmail';
import { IEmailVerifiedResponse } from '@/interfaces/userInterface';
import { IGenericError } from '@/interfaces/errorInterface';
import ModalError from '@/components/ModalError';

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModalError, setShowModalError] = useState<boolean>(false);

  const handleModalErrorClose = () => {
    setShowModalError(false);
    
    navigate('/');
  };

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      const fetchVerifyEmail = async () => {
        const response: IEmailVerifiedResponse | IGenericError = await verifyEmail({ token });

        if ('error' in response) {
          setErrorMessage(response.message);
          setShowModalError(true);

          return;
        }

        navigate('/verificar-email-ok');
      };

      fetchVerifyEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  
  return (
    <Container className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={logo} width={255} height={231} fluid className={styles.logo} />
        <div>
          <p className={styles.title}>
            verificando e-mail...
          </p>
        </div>
      </div>

      <ModalError
        showModalError={showModalError}
        handleModalErrorClose={handleModalErrorClose}
        errorMessage={errorMessage}
      />
    </Container>
  );
};

export default EmailVerified;
