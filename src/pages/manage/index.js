import React, { useEffect, useState } from "react";
import { Table, Space, Button, message } from "antd";
import { Link } from "react-router-dom";
import BlockChainNetwork from "../../socket/connect/test";
import { SOCKET_ENDPOINT } from "../../config";
import Axios from "axios";
import { CheckCircleOutlined, ReloadOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <Link>{text}</Link>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Cadidates",
    key: "cadidate",
    render: (text, record) => (
      <Space size="middle">
        {record.names.map((name) => (
          <Link>{name}</Link>
        ))}
      </Space>
    ),
  },
];

export default function Manage() {
  const [data, setData] = useState([]);

  const confirmVotes = async () => {
    const result = await Axios({
      method: "post",
      url: SOCKET_ENDPOINT + "confirm-votes",
    });
    if (result.data.result) {
      message.success("Confirmed");
      getData();
    } else message.error("Something wrong when confirm, please try again");
  };

  const getData = async () => {
    const result = await Axios({
      method: "get",
      url: SOCKET_ENDPOINT + "pending-votes",
    });
    if (result.data.result) {
      let { votes } = result.data;
      let newDataArray = [];
      for (let i = 0; i < votes.length; i++) {
        let newData = {
          key: i + 1 + "",
          name: votes[i].info.name,
          age: votes[i].info.age,
          id: votes[i].info.cmnd,
          address: votes[i].info.email,
          names: votes[i].voteTo,
        };
        newDataArray.push(newData);
      }
      setData(newDataArray);
      message.success("Get all pending votes completed");
    } else message.error("Cannot get pending votes");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BlockChainNetwork>
      <Button
        type="primary"
        icon={<CheckCircleOutlined />}
        onClick={confirmVotes}
        style={{ marginBottom: 20 }}
      >
        Confirm all votes
      </Button>
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        onClick={getData}
        style={{ marginBottom: 20, marginLeft: 20 }}
      >
        Reload
      </Button>
      <Table columns={columns} dataSource={data} />;
    </BlockChainNetwork>
  );
}
