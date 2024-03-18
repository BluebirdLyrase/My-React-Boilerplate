import { Col, Row } from 'antd';

export const FormRow = ({ children, ...props }) => {
  return (
    <Row gutter={[16, 16]} {...props}>
      {children}
    </Row>
  );
};

export const FormCol = ({ children, span, ...props }) => {
  return (
    <Col
      xs={{ span: 24 }}
      md={{ span: 24 }}
      lg={{ span: span <= 12 ? 12 : span }}
      xl={{ span: span }}
      {...props}
    >
      {children}
    </Col>
  );
};
