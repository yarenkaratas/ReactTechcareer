import React, { useState, useEffect } from "react";
import { Form, Input, Row, Col, Button, Select, Checkbox, message } from "antd";
import axios from "axios";
import { useForm } from "rc-field-form";
const { Option } = Select;

function AddProduct() {
  const [categories, setcategories] = useState([]);
  const [suppliers, setsuppliers] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    axios.get("https://northwind.vercel.app/api/categories").then((res) => {
      setcategories(res.data);
    });

    axios.get("https://northwind.vercel.app/api/suppliers").then((res) => {
      setsuppliers(res.data);
    });
  }, []);

  const submit = (values) => {
    axios
      .post("https://northwind.vercel.app/api/products", values)
      .then((res) => {
        form.resetFields();
        message.success("Success");
      });
  };

  return (
    <>
      <Form onFinish={submit} form={form}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="categoryId" label="Categories">
              <Select defaultValue="Please select a category!">
                {categories.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="supplierId" label="Supplier">
              <Select defaultValue="Please select a supplier!">
                {suppliers.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.companyName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[
                { required: true, message: "Please input your product name" },
                { max: 30 },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Unit Price" name="unitPrice">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="discontinued" valuePropName="checked">
              <Checkbox>Discontinued</Checkbox>
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

export default AddProduct;
