import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Table } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import {
  addToFavoritesAction,
  removeToFavoritesAction,
} from "../redux/actions/favorites.action";

const { confirm } = Modal;
function Customers(props) {
  console.log(props.state);
  const [customers, setcustomers] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = () => {
    axios.get("https://northwind.vercel.app/api/customers").then((res) => {
      setcustomers(res.data);
      setloading(false);
    });
  };

  const deleteCustomer = (id) => {
    confirm({
      title: "Are you sure delete this task?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        setloading(true);
        axios
          .delete(`https://northwind.vercel.app/api/customers/${id}`)
          .then((res) => {
            getCustomers();
          });
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const add = (id) => {
    //id ye göre customer ı yakalıyorum
    let customer = customers.find((q) => q.id === id);
    //globaldaki state e erişip o customerı favoriye ekleyecek
    let favoriteCustomer = props.favorites.find(
      (item) => item.id === customer.id
    );
    if (!favoriteCustomer) props.addToFavorites(customer);
    else props.removeFavorites(customer.id);
  };

  const favoriteControl = (id) => {
    //eğer müşteri favlardaise dolu yıldız değilse boş yıldız gelecek
    let isFavorite = props.favorites.find((q) => q.id == id);

    if (isFavorite) {
      return <StarFilled />;
    } else {
      return <StarOutlined />;
    }
  };

  let columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
    },
    {
      title: "Contact Title",
      dataIndex: "contactTitle",
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (id) => (
        <Button
          onClick={() => deleteCustomer(id)}
          type="primary-outline"
          danger
        >
          Delete
        </Button>
      ),
    },
    {
      title: "Favorite",
      dataIndex: "id",
      render: (id) => (
        <Button
          onClick={() => add(id)}
          type="circle"
          icon={favoriteControl(id)}
        ></Button>
      ),
    },
  ];

  return (
    <>
      <Table
        bordered={true}
        columns={columns}
        pagination={{ pageSize: 8 }}
        dataSource={customers}
        loading={loading}
      ></Table>
    </>
  );
}

const mapSatateToProps = (state) => {
  //favorites prop name of global
  return {
    favorites: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToFavorites: (data) => {
      dispatch(addToFavoritesAction(data));
    },
    removeFavorites: (data) => {
      //dispatch({type:"REMOVE",payload:data})
      dispatch(removeToFavoritesAction(data));
    },
  };
};

export default connect(mapSatateToProps, mapDispatchToProps)(Customers);
//bağlanırken bu iki metodu vericem
