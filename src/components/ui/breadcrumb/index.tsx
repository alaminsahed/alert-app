import { Breadcrumb as BreadcrumbAnt, Typography } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import cls from 'classnames';

import styles from './breadcrumb.module.css';
import commonStyle from '../../../css/index.module.css';

interface BreadcrumbProps {
  title?: string;
  subItems?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, subItems }) => {
  return (
    <div>
      <h2 className={cls('m-0', commonStyle.table_header)}>{title}</h2>
      <BreadcrumbAnt
        items={[
          {
            title: <Link to="/">Dashboard</Link>,
          },
          {
            title: (
              <div className={styles.subItems}>{subItems ? subItems : ''}</div>
            ),
          },
        ]}
      />
    </div>
  );
};

export { Breadcrumb };
