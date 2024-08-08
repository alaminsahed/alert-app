import { Button, Col, Form, Layout, Row, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';

import { useForm } from 'antd/es/form/Form';
import { RequestOtp, VerifyOtp } from 'api/login';
import { SirenIcon } from 'components/svg/sidebarIcon';
import { PRIVATE, PUBLIC } from 'constants/appRoutes';
import { setUser } from 'features/auth/authSlice';
import { usePost } from 'hooks/useCustomApi';
import { useState } from 'react';
import OTPInput from 'react-otp-input';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from '../sign-in/sign-in.module.css';

const Otp = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = useForm();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');

  const postData: any = usePost(VerifyOtp);
  const ReqData: any = usePost(RequestOtp);

  const againOtp = () => {
    const payload = {
      mobile_no: params?.number,
    };
    try {
      ReqData.mutate(payload, {
        onSuccess: (data: any) => {
          message.success(data?.message);
        },
        onError: (error: any) => {
          message.error(
            error?.errors[0] ||
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

  const onFinish = (values: any) => {
    const payload = {
      mobile_no: params?.number,
      otp: otp,
    };
    try {
      postData.mutate(payload, {
        onSuccess: (data: any) => {
          message.success(data?.message);
          if (data?.data === null) {
            navigate(`/register/${otp}/${params?.number}`);
          } else {
            dispatch(setUser(data?.data));
            navigate(PRIVATE.HOME);
          }
        },
        onError: (error: any) => {
          message.error(
            error?.errors[0] ||
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
                    {params?.number} নাম্বারটিতে একটি ওটিপি গিয়েছে
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
                      <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => <input {...props} />}
                        containerStyle={{
                          display: 'flex',
                          padding: '0',
                        }}
                        inputStyle={{
                          display: 'inline-block',
                          width: '100%',
                          height: '44px',
                          marginRight: '10px',
                          padding: '0.4375rem 0.75rem',
                          border: '1px solid #e6e7e9',
                          borderRadius: '6px',
                          fontFamily: 'Hero-New-Medium',
                          lineHeight: '1.8rem',
                          fontSize: '16px',
                          fontWeight: 500,
                        }}
                        shouldAutoFocus
                      />
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
                    <Link to="" style={{ color: 'red' }} onClick={againOtp}>
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
