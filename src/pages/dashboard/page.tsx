import { Button, Card } from 'antd';
import { DataTable } from 'components/ui';
import React, { useState } from 'react';
import Columns from './compoents/colums';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { PRIVATE } from 'constants/appRoutes';

function DashboardPage() {
  const initialValues = {
    page: 1,
    limit: 10,
  };
  const [query, setQuery] = useState<any>(initialValues);

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
        data={[]}
        query={query}
        setQuery={setQuery}
        columns={Columns()}
      />
    </Card>
  );
}

export default DashboardPage;
