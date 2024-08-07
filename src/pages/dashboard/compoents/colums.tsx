import React from 'react';
import { Button, message } from 'antd';

const Columns = () => {
  return [
    {
      title: 'Initiated By',
      dataIndex: 'id',
      render: (text: any, record: any) => record?.id || 'N/A',
    },
    {
      title: 'Initiator Mobile',
      dataIndex: 'code',
      key: 'code',
      render: (_: any, record: any) => record?.code || 'N/A',
    },
    {
      title: 'Date Time',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
    {
      title: 'Incident Type',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
    {
      title: 'Remarks',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
    {
      title: 'ঠিকানা',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
    {
      title: 'Voice',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
    {
      title: 'Photo',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => record?.name || 'N/A',
    },
  ];
};

export default Columns;
