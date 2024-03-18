import { Input } from 'antd';
import React, { ChangeEvent, Fragment } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from './decoration/Text';
import { InputFormSkeleton } from './decoration/InputFormSkeleton';
import {
  HideError,
  HideRequire,
  InputLabel,
  InputName,
  ValidationRules,
} from './input';

export const InputTextComponent: React.FC<{
  rules: ValidationRules;
  name: InputName;
  label: InputLabel;
  placeholder?: string;
  disabled?: boolean;
  inputType?: 'text' | 'tel' | 'time' | 'url' | 'password' | 'email';
  maxLength?: number;
  isLoading?: boolean;
  hideError?: HideError;
  hideRequire?: HideRequire;
}> = ({
  rules = { required: false },
  name,
  label,
  placeholder = '',
  disabled = false,
  inputType = 'text',
  maxLength = null,
  isLoading = false,
  hideError = false,
  hideRequire = false,
  ...propsInput
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod)
    throw new Error(`InputTextComponent must be warp by FormProvider`);

  const { setValue, control } = useFormMethod;

  function handleChange(event: ChangeEvent) {
    const value = (event.target as HTMLInputElement).value;
    setValue(name, value, { shouldDirty: true });
  }

  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });
  const { error } = fieldState;
  const { value } = field;

  return (
    <Fragment>
      <InputHeader rules={rules} label={label} hideRequire={hideRequire} />
      {isLoading ? (
        <InputFormSkeleton />
      ) : (
        <Input
          style={{
            border: `1px solid ${error ? 'red' : '#d9d9d9'}`,
          }}
          id={name}
          name={name}
          value={value}
          type={inputType}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={maxLength}
          {...propsInput}
        />
      )}
      <InputFooter error={error} hideError={hideError} label={label} />
    </Fragment>
  );
};
