import { useCallback, useState } from 'react';
import { validateSuspendReason } from './customersSuspendUtils';

const useCustomersSuspendForm = ({ onConfirm }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState(null);

  const handleReasonChange = useCallback((event) => {
    setReason(event.target.value);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const validationError = validateSuspendReason(reason);

      if (validationError) {
        setError(validationError);
        return;
      }

      onConfirm(String(reason).trim());
    },
    [onConfirm, reason],
  );

  return {
    reason,
    error,
    onReasonChange: handleReasonChange,
    onSubmit: handleSubmit,
  };
};

export default useCustomersSuspendForm;
