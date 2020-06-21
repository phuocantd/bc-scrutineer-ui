import React, { useEffect } from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";
const objCodec = require("object-encode");

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

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    id: "223362458",
    address: "New York No. 1 Lake Park",
    names: ["SABSDGSDG", "AGSDGS", "ADGSDHGBDSK"],
  },
];

export default function Manage() {
  useEffect(() => {
    const d = localStorage.getItem("block-chain-data");
    if (!!d) {
      const chain = JSON.parse(objCodec.decode(d, "base64", 10));
      console.log(chain);
    }
  }, []);

  return <Table columns={columns} dataSource={data} />;
}
