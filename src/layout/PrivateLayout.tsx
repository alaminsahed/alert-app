import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {
  Avatar,
  Button,
  ConfigProvider,
  Image,
  Layout,
  Menu,
  Popover,
  Typography,
} from 'antd';
import { Suspense, useCallback, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import ErrorBoundary from 'components/error-boundary';
import { Loader } from 'components/layout';
import { HomeIcon } from 'components/svg/sidebarIcon';
import { PRIVATE } from 'constants/appRoutes';
import { MENU_ITEMS } from 'constants/menuItems';
import { clearUser } from 'features/auth/authSlice';
import useCollapsed from 'hooks/useCollapsed';
import { useDispatch, useSelector } from 'react-redux';
import styles from './PrivateLayout.module.css';

const { Header, Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const imageURL =
  'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small/man-avatar-icon-free-vector.jpg';

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | null,
  route?: string,
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    route,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem(MENU_ITEMS.DASHBOARD, PRIVATE.HOME, <HomeIcon />),
];

const PrivateLayout: React.FC = () => {
  const auth: any = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { collapsed, setCollapsed } = useCollapsed();
  const [visible, setVisible] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const handleLogout = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  const content = (
    <div>
      <Button type="text" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgHeader: '#3F3F3F',
          },
        },
      }}
    >
      <Layout hasSider>
        <Sider
          width={220}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div
            className={
              collapsed ? styles.collapsedLogoContainer : styles.logoContainer
            }
            onClick={() => navigate(PRIVATE.HOME)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              color: 'white',
              backgroundColor: '#3F3F3F',
              borderRadius: 5,
              textAlign: 'center',
            }}
          >
            Quick Response
          </div>
          <hr />
          <ConfigProvider
            theme={{
              token: {},
              components: {
                Menu: {
                  itemBg: '#3F3F3F',
                  subMenuItemBg: '#3F3F3F',
                },
              },
            }}
          >
            <Menu
              theme="dark"
              defaultSelectedKeys={[currentPath]}
              mode="inline"
              items={items}
              onClick={({ key }) => {
                navigate(key);
              }}
            />
          </ConfigProvider>
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 220,
            transition: 'margin-left 0.3s ease',
            backgroundColor: '#f2f5fa',
            minHeight: '100vh',
          }}
        >
          <Header className={styles.headerContainer}>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: 'black',
              }}
            />
            {/* <Profile /> */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px',
              }}
            >
              {/* <span
                style={{
                  paddingRight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Notification height={30} width={30} color="white" />
              </span> */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '10px',
                }}
              >
                <Typography.Text style={{ color: 'black' }}>
                  {auth?.user?.name}
                </Typography.Text>
                <Typography.Text type="secondary" style={{ color: 'blue' }}>
                  {auth?.user?.email}
                </Typography.Text>
              </div>
              <Popover
                content={content}
                trigger="click"
                open={visible}
                onVisibleChange={handleVisibleChange}
              >
                <Avatar
                  src={imageURL}
                  size="large"
                  style={{
                    backgroundColor: '#87d068',
                    cursor: 'pointer',
                  }}
                />
              </Popover>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px 0',
              overflow: 'initial',
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            <ErrorBoundary>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          </Content>

          <Footer
            style={{
              textAlign: 'center',
              padding: '12px 0',
            }}
          >
            Developed by{' '}
            <a
              className={styles.footerLink}
              href="https://sslwireless.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              SSL Wireless
            </a>{' '}
            {year}
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default PrivateLayout;
