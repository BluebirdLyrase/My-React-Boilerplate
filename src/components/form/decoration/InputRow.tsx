import React from 'react';
import { Row } from 'antd';

export const InputRow: React.FC = ({ children }) => {
  return (
    <Row
      style={{
        display: `flex`,
        whiteSpace: `nowrap !important`,
        flex: `1 0 auto !important`,
        alignItems: `center`,
        flexGlow: `row nowrap`,
      }}
    >
      {children}
    </Row>
  );
};
