import { Input } from 'antd';
import React, { Fragment } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from '../component/Text';
import { InputFormSkeleton } from '../component/InputFormSkeleton';

export const InputTextComponent = ({
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
  hideRequire = false,
  ...propsInput
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod) throw new Error(`InputTextComponent must be warp by FormProvider`);
  if (!name) throw new Error(`must provide name for InputTextComponent`);

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
          step={inputStep}
          disabled={disabled}
          onChange={(e) => (propsInput.handleChange ? propsInput.handleChange(e) : handleChange(e))}
          placeholder={placeholder}
          maxLength={maxLength}
          {...propsInput}
        />
      )}
      <InputFooter error={error} hideError={hideError} label={label} />
    </Fragment>
  );
};
