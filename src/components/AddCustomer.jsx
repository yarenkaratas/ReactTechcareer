import React from "react";
import { Form, Input, Row, Col, Button } from "antd";
import axios from "axios";

function AddCustomer() {
  const submitForm = (values) => {
    axios
      .post("https://northwind.vercel.app/api/customers", values)
      .then((res) => {
        console.log("RES", res.data);
      });
  };

  return (
    <>
      <Form layout="vertical" onFinish={submitForm}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: "Please input your company name!",
                },
                {
                  max: 30,
                  message: "Max 30 karakter girin",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Contact Name" name="contactName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Contact Title" name="contactTitle">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddCustomer;
