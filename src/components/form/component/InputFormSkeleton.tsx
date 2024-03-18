import { Skeleton } from 'antd';
import React from 'react';

export const InputFormSkeleton: React.FC = () => (
  <div
    style={{
      width: '100%',
    }}
  >
    <Skeleton.Input
      active={true}
      style={{
        width: '100%',
      }}
    />
  </div>
);
