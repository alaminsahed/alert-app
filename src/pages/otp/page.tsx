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
import { useDispatch } from 'react-redux';

import { useForm } from 'antd/es/form/Form';
import { VerifyOtp } from 'api/login';
import { SirenIcon } from 'components/svg/sidebarIcon';
import { PUBLIC } from 'constants/appRoutes';
import { setUser } from 'features/auth/authSlice';
import { usePost } from 'hooks/useCustomApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from '../sign-in/sign-in.module.css';

const Otp = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = useForm();
  const dispatch = useDispatch();

  const postData: any = usePost(VerifyOtp);

  const onFinish = (values: any) => {
    const otpString = Array.from({ length: 6 })
      .map((_, index) => values[`otp${index}`])
      .join('');

    const payload = {
      mobile_no: params?.number,
      otp: otpString,
      type: params?.type,
    };
    try {
      postData.mutate(payload, {
        onSuccess: (data: any) => {
          message.success(data?.message);
          if (params?.type === '1') {
            navigate(`/register/${otpString}/${params?.number}`);
          } else {
            dispatch(setUser(data?.data));
          }
        },
        onError: (error: any) => {
          message.error(
            error?.errors?.otp[0] ||
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
                      {Array.from({ length: 6 }).map((_, index) => (
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
