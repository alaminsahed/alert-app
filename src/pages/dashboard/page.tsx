import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, message } from 'antd';
import { listIncident } from 'api/dashboard';
import { DataTable } from 'components/ui';
import { PRIVATE } from 'constants/appRoutes';
import { QUERY_KEYS } from 'constants/queryKeys';
import { useFetch } from 'hooks/useCustomApi';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Columns from './compoents/colums';

function DashboardPage() {
  const initialValues = {
    page: 1,
    limit: 10,
  };
  const [query, setQuery] = useState<any>(initialValues);

  const { data, isLoading } = useFetch(
    [QUERY_KEYS.INCIDENTS, query],
    () => listIncident(),
    {
      onError: (error: any) => {
        message.error('Unable to load');
      },
    },
  );

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        <h4>Alert List</h4>
        <Button>
          <Link to={PRIVATE.CREATE_INCIDENT}>
            <PlusOutlined /> Create New
          </Link>
        </Button>
      </div>
      <DataTable
        data={data?.data?.map((item: any) => ({
          id: item?.id,
          key: item?.id,
          user: item?.user?.name,
          mobile: item?.user?.mobile_no,
          type: item?.incident_type?.name,
          details: item?.note,
          audio: item?.audio,
          audio_url: item?.audio_url,
          photo: item?.image,
          photo_url: item?.image_url,
          status_text: item?.status_title,
          status: item?.status,
        }))}
        query={query}
        setQuery={setQuery}
        columns={Columns()}
        loading={isLoading}
      />
    </Card>
  );
}

export default DashboardPage;
