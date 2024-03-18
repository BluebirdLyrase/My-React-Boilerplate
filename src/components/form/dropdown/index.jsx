import { Select as SelectAntd } from 'antd';
import React, { Fragment, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from '../component/Text';
import { InputFormSkeleton } from '../component/InputFormSkeleton';

export const DropdownComponent = ({
  rules = {},
  name,
  label,
  placeholder,
  mode, //TODO
  disabled = false,
  options = [],
  hideRequire = false,
  showSearch = true,
  allowClear = true,
  showArrow = true,
  onChangeCallBack = false,
  hideError = false,
  isLoading = false,
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod) throw new Error(`Dropdown must be warp by FormProvider`);
  if (!name) throw new Error(`must provide name for Dropdown`);
  if (!label) throw new Error(`must provide label for Dropdown`);

  const { setValue, control } = useFormMethod;

  function handleClear() {
    setValue(name, ``);
  }

  function handleChange(e) {
    setValue(name, e || '', { shouldDirty: true });
  }

  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });
  const { error } = fieldState;
  const { value } = field;

  const opt = useMemo(() => {
    return options.map((e, i) => {
      return (
        <SelectAntd.Option
          key={`${e.label}_${i + 1}`}
          value={e.value}
          option={e}
          id={`${name}-${e.value}`}
        >
          {e.label}
        </SelectAntd.Option>
      );
    });
  }, [options]);

  return (
    <Fragment>
      <InputHeader rules={rules} hideRequire={hideRequire} label={label} />

      {isLoading ? (
        <InputFormSkeleton />
      ) : (
        <SelectAntd
          style={{
            width: '100%',
            border: error ? '1px solid red' : '',
            borderRadius: '6px',
          }}
          showSearch={showSearch}
          allowClear={allowClear}
          showArrow={showArrow}
          id={name}
          value={value || []}
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={(e, other) => {
            if (onChangeCallBack) {
              onChangeCallBack(e, other);
            }
            handleChange(e);
          }}
          onClear={() => handleClear()}
          mode={mode || undefined}
          disabled={disabled}
        >
          {opt}
        </SelectAntd>
      )}
      <InputFooter error={error} hideError={hideError} label={label} />
    </Fragment>
  );
};
