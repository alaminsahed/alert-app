import { Avatar, Menu } from 'antd';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearUser } from 'features/auth/authSlice';
import styles from './profile.module.css';

interface ProfileDropdownProps {
  name: string;
  email: string;
  image: string;
}
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  email,
  image,
  name,
}) => {
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return (
    <div className={styles.dropdown}>
      <div className={styles.profile__section}>
        <div className={styles.image__section}>
          <img src={image} alt="profile" />
        </div>
        <div className={styles.name__section}>
          <h3>{name}</h3>
          <p>{email}</p>
        </div>
      </div>
      <hr />
      <div className={styles.profile__menu__setting__section}>
        <ul>
          <li>
            <Link to="/change-password">Change Password</Link>
          </li>
          <li>
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const [current, setCurrent] = useState<string>('mail');

  const imageURL =
    'https://static.vecteezy.com/system/resources/thumbnails/006/487/917/small/man-avatar-icon-free-vector.jpg';

  const items = [
    {
      key: 'SubMenu',
      icon: (
        <Avatar
          src={imageURL}
          size="large"
          style={{
            backgroundColor: '#87d068',
            marginTop: '15px',
            padding: '0px',
          }}
        />
      ),
      children: [
        {
          type: 'group',
          label: (
            <ProfileDropdown
              email="test@test.com"
              image={imageURL}
              name="System Admin"
            />
          ),
        },
      ],
    },
  ];

  return (
    <Menu
      className={styles.profile}
      onClick={(e) => setCurrent(e.key.toString())}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
      style={{
        backgroundColor: '#272a68',
      }}
    />
  );
};

export { Profile };
