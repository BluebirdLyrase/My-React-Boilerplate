import { Input } from 'antd';
import React, { Fragment } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from '../component/Text';
import { InputFormSkeleton } from '../component/InputFormSkeleton';

export const InputArea = ({
  rules = {},
  name,
  label,
  placeholder,
  disabled,
  inputType = 'text',
  inputStep = '0.01',
  maxLength = null,
  isLoading = false,
  hideError = false,
  ...propsInput
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod) throw new Error(`InputArea must be warp by FormProvider`);
  if (!name) throw new Error(`must provide name for InputArea`);
  if (!label) throw new Error(`must provide label for InputArea`);

  const { setValue, control } = useFormMethod;

  function handleChange(e) {
    setValue(name, e.target.value, { shouldDirty: true });
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
      <InputHeader rules={rules} label={label} hideError={hideError} />
      {isLoading ? (
        <InputFormSkeleton />
      ) : (
        <Input.TextArea
          style={{
            border: `1px solid ${error ? 'red' : '#d9d9d9'}`,
          }}
          id={name}
          name={name}
          value={value}
          type={inputType}
          step={inputStep}
          disabled={disabled}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={'off'}
          {...propsInput}
        />
      )}
      <InputFooter error={error} hideError={hideError} label={label} />
    </Fragment>
  );
};
