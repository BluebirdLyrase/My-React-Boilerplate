import React from 'react';
import { Button } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import { useFormContext } from 'react-hook-form';

export const SearchButton = () => {
  const useFormMethod = useFormContext();

  if (!useFormMethod) throw new Error(`SearchButton must be warp by FormProvider`);
  if (!useFormMethod.onSearch) throw new Error(`onSearch is not Provide in FormProvider`);

  const { handleSubmit, onSearch } = useFormMethod;

  return (
    <Button
      style={{ alignItems: `center`, margin: `5px` }}
      type={'primary'}
      onClick={handleSubmit(onSearch)}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ height: `100%`, marginTop: `3px`, marginRight: `0.5px` }}>
          <AiOutlineSearch size={'1.25em'} />
        </div>
        <div style={{ marginLeft: '3px', marginTop: '1.5px' }}>ค้นหา</div>
      </div>
    </Button>
  );
};
