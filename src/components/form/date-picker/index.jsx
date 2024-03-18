import { ConfigProvider } from 'antd';
import thTh from 'antd/locale/th_TH';
import dayjs from 'dayjs';
import 'dayjs/locale/th'; /**NOTE: ทำให้ datepicker แสดงเดือนภาษาไทย มันไม่ต้องใช้เป็น props แค่ประกาศก็ใช้ได้เลย */
import buddhistEra from 'dayjs/plugin/buddhistEra';
import React, { Fragment } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from '../component/Text';
import BuddhistDatePicker from './DatePicker';

dayjs.extend(buddhistEra);

export const DatePickerComponent = ({
  rules = {},
  name,
  label,
  format = 'DD/MM/BBBB',
  disabled = false,
  hideRequire = false,
  hideError = false,
  disabledDate = null,
  picker = null,
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod) throw new Error(`Dropdown must be warp by FormProvider`);
  if (!name) throw new Error(`must provide name for Dropdown`);
  if (!label) throw new Error(`must provide label for Dropdown`);

  const { setValue, control } = useFormMethod;

  const { field, fieldState } = useController({
    control,
    name,
    rules,
  });
  const { error } = fieldState;
  const { value } = field;

  const handleChange = (e) => {
    setValue(name, e, {
      shouldDirty: true,
    });
  };

  return (
    <Fragment>
      <InputHeader rules={rules} hideRequire={hideRequire} label={label} />
      <ConfigProvider locale={thTh}>
        <BuddhistDatePicker
          id={name}
          style={{ width: '100%' }}
          format={format}
          allowClear={true}
          disabled={disabled || false}
          disabledDate={disabledDate}
          value={value}
          onChange={handleChange}
          picker={picker}
        />
      </ConfigProvider>
      <InputFooter error={error} hideError={hideError} label={label} />
    </Fragment>
  );
};
