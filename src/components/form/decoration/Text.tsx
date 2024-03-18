import React from 'react';
import { Typography } from 'antd';
import { InputRow } from './InputRow';
import { FieldError } from 'react-hook-form';
import { HideError, HideRequire, InputLabel, ValidationRules } from '../input';

export const renderTypeError: (
  param1: InputLabel,
  param2: FieldError
) => string | undefined = (label: InputLabel, error: FieldError) => {
  if (error?.message) {
    return error.message;
  }
  switch (error.type) {
    case 'required':
      return `โปรดระบุ ${label}`;
    case 'pattern':
      return `รูปแบบไม่ถูกต้อง`;
    case 'maxLength':
      return `ระบุไม่เกิน ${error.message} ตัวอักษร`;
    case 'max':
      return `ระบุจำนวนไม่เกิน ${error.message} ตัวอักษร`;
    case 'minLength':
      return `ระบุไม่น้อยกว่า ${error.message} ตัวอักษร`;
    case 'min':
      return `ระบุไม่น้อยกว่า ${error.message} ตัวอักษร`;
  }
};

type InputFooterProps = {
  error?: FieldError;
  hideError?: HideError;
  label: InputLabel;
};

export const InputFooter: React.FC<InputFooterProps> = ({
  error,
  hideError = false,
  label,
}) => {
  const showError =
    error && !hideError && !(error.type === 'validate' && error.message === '');
  return (
    <InputRow>
      {showError ? (
        <Typography.Text style={{ color: 'red' }}>
          {renderTypeError(label, error)}
        </Typography.Text>
      ) : (
        <Typography.Text style={{ color: 'red', visibility: 'hidden' }}>
          placeholder
        </Typography.Text>
      )}
    </InputRow>
  );
};

type InputHeaderProps = {
  label: InputLabel;
  hideRequire?: HideRequire;
  rules: ValidationRules;
};

export const InputHeader: React.FC<InputHeaderProps> = ({
  rules,
  hideRequire,
  label,
}) => {
  return (
    <InputRow>
      {label && (
        <Typography.Text style={{ fontWeight: 'bold' }}>
          {label}
        </Typography.Text>
      )}
      {!hideRequire && rules && rules.required && (
        <div
          style={{
            color: 'red',
            position: 'relative',
            top: '3px',
            left: '3px',
          }}
        >
          *
        </div>
      )}
    </InputRow>
  );
};
