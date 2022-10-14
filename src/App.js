import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Badge, Layout, Menu } from "antd";
import Customers from "./components/Customers";
import AddCustomer from "./components/AddCustomer";

import Products from "./components/Products";
import Favorites from "./components/Favorites";
import { HeartOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import AddProduct from "./components/AddProduct";
import AddSupplierWithFormik from "./components/AddSupplierWithFormik";
import { connect, useSelector } from "react-redux";
import Todos from "./components/Todos";
import Archives from "./components/Archives";
import Home from "./components/Home";
//import { Space } from "antd";
const { Header, Content, Footer } = Layout;

function App(props) {
  let archives = useSelector((state) => state);
  const items = [
    { label: <Link to={"/"}>Home</Link>, key: "1" },
    { label: <Link to={"/customers"}>Customers</Link>, key: "2" },

    { label: <Link to={"/addcustomer"}>Add Customer</Link>, key: "3" },
    { label: <Link to={"/products"}>Products</Link>, key: "4" },
    { label: <Link to={"/addproducts"}>Add Product</Link>, key: "5" },
    {
      label: (
        <Link to={"/addsupplierwithformik"}>Add Supplier With Formik</Link>
      ),
      key: "6",
    },
    {
      label: (
        <Link to={"/favorites"}>
          Favorites
          <Badge count={0}></Badge>
        </Link>
      ),
      key: "7",
    },
    { label: <Link to="/todos">Todo List</Link>, key: "8" },
    {
      label: (
        <Link to="/archives">
          Archives <Badge count={archives.length}></Badge>
        </Link>
      ),
      key: "9",
    },

    {
      label: (
        <Link to={"/cart"}>
          Cart
          <ShoppingCartOutlined />
        </Link>
      ),
      key: "10",
    },
  ];
  return (
    <>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            color: "#fff1f0",
          }}
        >
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 380,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />}></Route>

              <Route path="/customers" element={<Customers />}></Route>
              <Route path="/addcustomer" element={<AddCustomer />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/addproducts" element={<AddProduct />}></Route>
              <Route
                path="/addsupplierwithformik"
                element={<AddSupplierWithFormik />}
              ></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
              <Route path="/todos" element={<Todos />}></Route>
              <Route path="/archives" element={<Archives />}></Route>
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    favorites: state,
  };
};

export default connect(mapStateToProps)(App);
