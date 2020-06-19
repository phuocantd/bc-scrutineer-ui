import React from "react";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";

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
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    id: "223368458",
    address: "London No. 1 Lake Park",
    names: ["AGSDGS", "ADGSDHGBDSK"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    id: "223562458",
    address: "Sidney No. 1 Lake Park",
    names: ["SABSDGSDG", "ADGSDHGBDSK"],
  },
];

export default function Manage() {
  return <Table columns={columns} dataSource={data} />;
}
