import { useRef, useState, useMemo } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

const VITE_RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string;

const useRecaptcha = () => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const handleRecaptcha = () => {
    if (captchaRef.current) {
      setRecaptchaToken(captchaRef.current.getValue());
    }
  };

  const resetRecaptcha = () => {
    captchaRef?.current?.reset();
    setRecaptchaToken(null);
  };

  const RecaptchaComponent = useMemo(() => {
    return () => (
      <ReCAPTCHA
        sitekey={VITE_RECAPTCHA_SITE_KEY}
        ref={captchaRef}
        onChange={handleRecaptcha}
        onExpired={() => setRecaptchaToken(null)}
      />
    );
  }, []);

  return {
    recaptchaToken,
    resetRecaptcha,
    RecaptchaComponent
  };
};

export default useRecaptcha;
