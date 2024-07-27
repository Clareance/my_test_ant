import React, { useState } from 'react';
import { Table, Input, Button, Form, Popconfirm, message } from 'antd';
import initialData from "./contant.js"

const DataList = () => {
    const [data, setData] = useState(initialData);
    const [searchName, setSearchName] = useState('');
    const [searchUsername, setSearchUsername] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
  
    // 定义列
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button type="danger">Delete</Button>
          </Popconfirm>
        ),
      },
    ];
  
    // 搜索功能
    const handleSearchName = (value) => {
      setSearchName(value.toLowerCase());
    };
  
    const handleSearchUsername = (value) => {
      setSearchUsername(value.toLowerCase());
    };
  
    const handleSearchEmail = (value) => {
      setSearchEmail(value.toLowerCase());
    };
  
    // 新增功能
    const handleAdd = () => {
      const newId = data.length + 1;
      const newData = {
        id: newId,
        name: 'New Name',
        username: 'NewUsername',
        email: 'newemail@example.com',
      };
      setData([...data, newData]);
      message.success('New item added successfully');
    };
  
    // 删除功能
    const handleDelete = (id) => {
      setData(data.filter(item => item.id !== id));
      message.success('Item deleted successfully');
    };
  
    // 过滤数据
    const filteredData = data.filter(item =>
      (searchName ? item.name.toLowerCase().includes(searchName) : true) &&
      (searchUsername ? item.username.toLowerCase().includes(searchUsername) : true) &&
      (searchEmail ? item.email.toLowerCase().includes(searchEmail) : true)
    );
  
    return (
      <div>
        <Input.Search
          placeholder="Search by Name"
          onSearch={handleSearchName}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Input.Search
          placeholder="Search by Username"
          onSearch={handleSearchUsername}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Input.Search
          placeholder="Search by Email"
          onSearch={handleSearchEmail}
          style={{ width: 200, marginBottom: 16 }}
        />
        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={handleAdd}
        >
          Add New
        </Button>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={record => record.id}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  };
  
  export default DataList;