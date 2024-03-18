import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Upload } from 'antd';
import { useState } from 'preact/hooks';
import React, { Fragment } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputFooter, InputHeader } from '../component/Text';

export const UploadInputComponent = ({
  rules = {},
  name,
  defaultValue,
  label,
  disabled,
  onCustomChange,
  uploadText,
  maxCount = 1,
  listType = 'picture',
  accept = '*',
  hideRequire = false,
  hideError = false,
  ...propsInput
}) => {
  const useFormMethod = useFormContext();
  if (!useFormMethod) throw new Error(`InputTextComponent must be warp by FormProvider`);
  if (!name) throw new Error(`must provide name for InputTextComponent`);

  const { setValue, control } = useFormMethod;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  function onChange(event) {
    setValue(name, event.fileList);
  }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

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
      <Upload
        defaultFileList={[]}
        id={name}
        beforeUpload={() => false}
        listType={listType} /** picture-card, picture */
        disabled={disabled || false}
        maxCount={maxCount}
        multiple={maxCount > 1 || false}
        accept={accept}
        onPreview={handlePreview}
        fileList={value}
        onChange={onCustomChange ? (e) => onCustomChange(e, onChange) : onChange}
        {...propsInput}
      >
        {value?.length === maxCount ? null : listType !== 'picture-card' ? (
          <Button icon={<UploadOutlined />} id={name + `-button`}>
            Upload
          </Button>
        ) : (
          uploadButton
        )}
      </Upload>
      <Modal
        destroyOnClose={true}
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
      {!hideRequire ? <InputFooter error={error} hideError={hideError} label={label} /> : null}
    </Fragment>
  );
};
