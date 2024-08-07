import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';
import Style from '../../../css/index.module.css';

interface DataTableProps {
  columns: ColumnsType;
  data: any[];
  loading?: boolean;
  isPaginated?: boolean;
  scroll?: {
    x?: number;
  };
  total?: number;
  query?: any;
  setQuery?: any;
}

export const DataTable: FC<DataTableProps> = ({
  loading = false,
  isPaginated = true,
  columns,
  scroll = {
    x: 1000,
  },
  total,
  data,
  query,
  setQuery,
}) => {
  const colObj = columns?.map((column: any) => ({
    ...column,
    key: column?.dataIndex,
  }));

  return (
    <Table
      bordered
      loading={loading}
      columns={colObj}
      scroll={scroll}
      dataSource={data?.map((item: any, index: number) => ({
        ...item,
        key: item?.id || index,
      }))}
      pagination={
        isPaginated && {
          responsive: true,
          showQuickJumper: true,
          showLessItems: true,
          defaultCurrent: query?.page ?? 1,
          defaultPageSize: query?.per_page ?? 100,
          showSizeChanger: true,
          onChange: (page: number, pageSize: number) =>
            setQuery({ ...query, page, per_page: pageSize }),
          total,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }
      }
      className={Style.table_fonts}
    />
  );
};
