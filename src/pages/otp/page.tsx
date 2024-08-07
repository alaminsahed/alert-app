import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from 'antd';
import { useDispatch } from 'react-redux';

import { login } from 'api/login';

import { useForm } from 'antd/es/form/Form';
import { setUser } from 'features/auth/authSlice';
import { usePost } from 'hooks/useCustomApi';
import style from '../sign-in/sign-in.module.css';
import { useState } from 'react';
import { SirenIcon } from 'components/svg/sidebarIcon';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PRIVATE, PUBLIC } from 'constants/appRoutes';

const Otp = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = (values: any) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    navigate(PRIVATE.HOME);
  };
  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Row style={{ height: '100%' }}>
        <Col
          style={{
            backgroundColor: '#C70039',
            color: 'white',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 53,
            paddingRight: 20,
          }}
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
        >
          <SirenIcon />
          <h3>ইমারজেন্সি এলার্ট লগিন</h3>
        </Col>
        <Col
          style={{
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
        >
          <div
            style={{
              width: 400,
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            className={style.form_section}
          >
            {
              <>
                {' '}
                <div style={{ marginBottom: 20 }}>
                  <Typography.Paragraph className={style.subHeader}>
                    {params?.number} নাম্বারটিতে ৫ ডিজিটের একটি ওটিপি গিয়েছে
                  </Typography.Paragraph>
                </div>
                <Form
                  name="basic"
                  onFinish={onFinish}
                  autoComplete="off"
                  form={form}
                  layout="vertical"
                >
                  <Form.Item>
                    <Row gutter={8} justify="center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Col key={index}>
                          <Form.Item
                            name={`otp${index}`}
                            noStyle
                            rules={[{ required: true, message: 'Required' }]}
                          >
                            <Input
                              maxLength={1}
                              style={{
                                width: 50,
                                height: 50,
                                textAlign: 'center',
                                fontSize: '24px',
                                borderRadius: '4px',
                                border: '1px solid #d9d9d9',
                              }}
                            />
                          </Form.Item>
                        </Col>
                      ))}
                    </Row>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      style={{ backgroundColor: '#FF3737', marginTop: 20 }}
                    >
                      ভেরিফাই
                    </Button>
                  </Form.Item>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Link to={PUBLIC.SIGN_IN} style={{ color: 'black' }}>
                      ইনফরমেশন এডিট করুন
                    </Link>
                    <Link to="" style={{ color: 'red' }}>
                      আবার পাঠান
                    </Link>
                  </div>
                </Form>
              </>
            }
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Otp;
