import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography,
  message,
} from 'antd';

import { RequestOtp } from 'api/login';

import { useForm } from 'antd/es/form/Form';
import { SirenIcon } from 'components/svg/sidebarIcon';
import { usePost } from 'hooks/useCustomApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './sign-in.module.css';

const SignInPage = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const postData: any = usePost(RequestOtp);
  const [form] = useForm();

  const onFinish = (values: any) => {
    const payload = {
      mobile_no: values.mobile_no,
    };
    try {
      postData.mutate(payload, {
        onSuccess: (data: any) => {
          message.success(data?.message);
          navigate(`/otp/${phone}`);
        },
        onError: (error: any) => {
          message.error(
            error?.message ||
              error?.response?.data?.error?.message ||
              'Something went wrong',
          );
        },
      });
    } catch (error) {
      console.log(error);
    }
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
                    লগিন করতে ইনফরমেশন প্রদান করুন
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
                    label="মোবাইল নম্বর"
                    name="mobile_no"
                    rules={[
                      {
                        required: true,
                        message: 'আপনার ফোন নম্বর দিন!',
                      },
                    ]}
                  >
                    <Input
                      placeholder="মোবাইল নম্বর দিন"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      style={{ backgroundColor: '#FF3737', marginTop: 20 }}
                    >
                      লগইন করুন / রেজিস্ট্রেশন করুন
                    </Button>
                    {/* <div style={{ marginTop: 20 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        style={{ marginTop: 20 }}
                        onClick={() => setType(1)}
                      >
                        রেজিস্ট্রেশন করুন
                      </Button>
                    </div> */}
                  </Form.Item>
                </Form>
              </>
            }
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default SignInPage;
