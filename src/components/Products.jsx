import React, { useState, useEffect } from "react";
import axios from "axios";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";

function Products() {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get("https:/northwind.vercel.app/api/products").then((res) => {
      setproducts(res.data);
      setloading(false);
    });
  };

  const add = (id) => {
    //let product = cart.find((q) => q.id === id);
    // if (product) {
    //   product.quantity = product.quantity + 1;
    //   setcart([...cart]);
    // } else {

    // }
    setloading(true);
    axios.post(`https:/northwind.vercel.app/api/products/${id}`).then((res) => {
      getProducts();
    });
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Unit Price",
      dataIndex: "unitPrice",
    },
    {
      title: "Units In Stock",
      dataIndex: "unitsInStock",
    },
    {
      title: "Add To Chart",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => add(id)} type="primary-outline" danger>
          Add To Chart <ShoppingCartOutlined />
        </Button>
      ),
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        bordered={true}
        pagination={{ pageSize: 8 }}
        dataSource={products}
        loading={loading}
      ></Table>
    </>
  );
}

export default Products;
