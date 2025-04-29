import { useState } from 'react';

export function useFormInput(initialValue = '') {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = event => {
    if (event.target) {
      setValue(event.target.value);
      setIsDirty(true);

      // Resolve errors as soon as input becomes valid
      if (error && event.target.checkValidity()) {
        setError(null);
      }
    }
  };

  const handleInvalid = event => {
    // Prevent native errors appearing
    if (event.target) {
      event.preventDefault();
      setError(event.target.validationMessage);
    }
  };

  const handleBlur = event => {
    // Only validate when the user has made a change
    if (isDirty && event.target) {
      event.target.checkValidity();
    }
  };

  return {
    value,
    error,
    onChange: handleChange,
    onBlur: handleBlur,
    onInvalid: handleInvalid,
  };
}
