import React from 'react';

export interface IValidationResult {
  isValid: boolean;
  message: string;
}

interface IFieldParams {
  onBlur?: (<T>(event: React.FormEvent<T>) => void);
  onValidated: (results: IValidationResult[]) => void;
  validators: Array<(value: any) => IValidationResult>;
}

const validatorsMap = {
  isRequired: (message: string) => (value: string): IValidationResult => ({
    isValid: !!value,
    message
  })
};

type Validators = typeof validatorsMap;

export const field = (configFn: (v: Validators) => IFieldParams) => {
  const { validators, onBlur, onValidated } = configFn(validatorsMap);

  return {
    onBlur: handleOnBlur
  };

  function handleOnBlur(event: any) {
    if (onBlur) {
      onBlur(event);
    }
    const value = event.target.value;
    const results = validators
      .map(validator => validator(value))
      .filter(r => r);
    onValidated(results);
  }
};
