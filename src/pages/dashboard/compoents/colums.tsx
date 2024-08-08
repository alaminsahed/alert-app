import { EyeOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { PRIVATE } from 'constants/appRoutes';
import { Link } from 'react-router-dom';

const Columns = () => {
  const downloadImage = async (url: any) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusTag = (status: any, text: any) => {
    if (status === 1) {
      return <Tag color="#1677ff">{text || 'N/A'}</Tag>;
    } else if (status === 2) {
      return <Tag color="#03b469">{text || 'N/A'}</Tag>;
    } else {
      return <Tag color="#ff3737">{text || 'N/A'}</Tag>;
    }
  };

  return [
    {
      title: 'Initiated By',
      dataIndex: 'user',
      key: 'user',
      render: (text: any, record: any) => record?.user || 'N/A',
    },
    {
      title: 'Initiator Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      render: (_: any, record: any) => record?.mobile || 'N/A',
    },
    {
      title: 'Date Time',
      dataIndex: 'date',
      key: 'date',
      render: (_: any, record: any) => record?.date || 'N/A',
    },
    {
      title: 'Incident Type',
      dataIndex: 'type',
      key: 'type',
      render: (_: any, record: any) => record?.type || 'N/A',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (_: any, record: any) => record?.details || 'N/A',
    },
    {
      title: 'Voice',
      dataIndex: 'audio',
      key: 'audio',
      render: (_: any, record: any) => (
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={() => downloadImage(record?.audio_url)}
        >
          {record?.audio || 'N/A'}
        </div>
      ),
    },
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (_: any, record: any) => (
        <div
          style={{
            cursor: 'pointer',
          }}
          onClick={() => downloadImage(record?.photo_url)}
        >
          {record?.photo || 'N/A'}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: any) =>
        statusTag(record?.status, record?.status_text),
    },
    {
      title: 'Action',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <Link key={record?.id} to={PRIVATE.VIEW_INCIDENT(record?.id)}>
          <Button icon={<EyeOutlined />} />
        </Link>
      ),
    },
  ];
};

export default Columns;
