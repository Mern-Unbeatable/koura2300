import { useCallback, useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (email) => EMAIL_PATTERN.test(email.trim());

const useNewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    setStatus('idle');
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!isValidEmail(email)) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setEmail('');
    },
    [email],
  );

  return {
    email,
    status,
    handleEmailChange,
    handleSubmit,
  };
};

export default useNewsletterForm;
