import { Input } from 'antd';
import React, { Fragment, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from '../component/Text';
import { InputFormSkeleton } from '../component/InputFormSkeleton';

export const InputNumberComponent = ({
  rules = {},
  name,
  label,
  placeholder,
  disabled,
  maxLength = null,
  isLoading = false,
  hideError = false,
  hideRequire = false,
  decimalDigit = 2,
  min = null,
  max = null,
  ...propsInput
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod) throw new Error(`InputTextComponent must be warp by FormProvider`);
  if (!name) throw new Error(`must provide name for InputTextComponent`);

  const currentValidValue = useRef(null);
  const { setValue, control, resetField } = useFormMethod;

  const resetToValidValue = () => {
    if (currentValidValue.current) {
      return setValue(name, currentValidValue.current);
    }
    return resetField(name);
  };

  function handleChange(value) {
    console.log('value:', value);
    setValue(name, value, { shouldDirty: true });
  }

  function handleBlur(element) {
    const curValue = parseFloat(element.target.value);

    if (isNaN(curValue)) {
      return resetToValidValue();
    }

    if (min !== null && curValue < min) {
      return resetToValidValue();
    }

    if (max !== null && curValue > max) {
      return resetToValidValue();
    }

    const fixedValue = parseFloat(curValue.toFixed(decimalDigit));

    currentValidValue.current = fixedValue;
    setValue(name, fixedValue, { shouldDirty: true });
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
            textAlign: 'right',
          }}
          id={name}
          name={name}
          value={value}
          type={'number'}
          disabled={disabled}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={(e) => handleBlur(e)}
          placeholder={placeholder}
          {...propsInput}
        />
      )}
      <InputFooter error={error} hideError={hideError} label={label} />
    </Fragment>
  );
};
