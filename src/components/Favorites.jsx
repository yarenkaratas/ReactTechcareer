import { Button, Table } from "antd";
import React from "react";
import { connect } from "react-redux";

function Favorites({ favorites, removeFavorites, removeAll }) {
  const remove = (id) => {
    removeFavorites(id);
  };

  const empty = () => {
    removeAll();
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
      title: "Remove",
      dataIndex: "id",
      render: (id) => (
        <Button onClick={() => remove(id)} danger>
          Remove
        </Button>
      ),
    },
  ];
  return (
    <>
      <Button danger onClick={() => empty()}>
        Remove All
      </Button>
      <Table dataSource={favorites} columns={columns}></Table>
    </>
  );
}

const mapSatateToProps = (store) => {
  return {
    favorites: store,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorites: (data) => {
      dispatch({ type: "REMOVE", payload: data });
    },
    removeAll: () => {
      dispatch({ type: "REMOVE_ALL" });
    },
  };
};

export default connect(mapSatateToProps, mapDispatchToProps)(Favorites);
