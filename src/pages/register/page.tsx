import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Select,
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
import { Link, useNavigate } from 'react-router-dom';
import { PRIVATE, PUBLIC } from 'constants/appRoutes';

const Register = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
    navigate(PUBLIC.SIGN_IN);
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
                    রেজিস্ট্রেশন করতে ইনফরমেশন প্রদান করুন
                  </Typography.Paragraph>
                </div>
                <Form
                  name="basic"
                  onFinish={onFinish}
                  autoComplete="off"
                  form={form}
                  layout="vertical"
                >
                  <Form.Item
                    label="নাম"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'আপনার নাম দিন!',
                      },
                    ]}
                  >
                    <Input placeholder="নাম দিন" />
                  </Form.Item>
                  <Form.Item
                    label="মোবাইল নম্বর"
                    name="mobile_no"
                    rules={[
                      {
                        required: true,
                        message: 'আপনার ফোন নম্বর দিন!',
                      },
                    ]}
                  >
                    <Input placeholder="মোবাইল নম্বর দিন" />
                  </Form.Item>
                  <Form.Item
                    label="এলাকা"
                    name="area"
                    rules={[
                      {
                        required: true,
                        message: 'আপনার এলাকা দিন!',
                      },
                    ]}
                  >
                    <Select options={[{ label: 'hello', value: 'hello' }]} />
                  </Form.Item>
                  <Form.Item
                    label="পাসওয়ার্ড"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'আপনার পাসওয়ার্ড দিন!',
                      },
                    ]}
                  >
                    <Input placeholder="পাসওয়ার্ড দিন" />
                  </Form.Item>
                  <Form.Item
                    label="পাসওয়ার্ড নিশ্চিত করুন"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'আপনার পাসওয়ার্ড দিন!',
                      },
                    ]}
                  >
                    <Input placeholder="পাসওয়ার্ড নিশ্চিত করুন" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      style={{ backgroundColor: '#FF3737', marginTop: 20 }}
                    >
                      রেজিস্ট্রেশন করুন
                    </Button>
                    <div style={{ marginTop: 20 }}>
                      <Link to={PUBLIC.SIGN_IN} style={{ color: 'black' }}>
                        লগইন করুন
                      </Link>
                    </div>
                  </Form.Item>
                </Form>
              </>
            }
          </div>
        </Col>
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
      </Row>
    </Layout>
  );
};

export default Register;
