import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Row,
  Select,
  Typography,
} from 'antd';
import { useDispatch } from 'react-redux';

import { useForm } from 'antd/es/form/Form';
import { areaList, RegisterUser } from 'api/login';
import { SirenIcon } from 'components/svg/sidebarIcon';
import { PRIVATE } from 'constants/appRoutes';
import { QUERY_KEYS } from 'constants/queryKeys';
import { setUser } from 'features/auth/authSlice';
import { useFetch, usePost } from 'hooks/useCustomApi';
import { useNavigate, useParams } from 'react-router-dom';
import style from '../sign-in/sign-in.module.css';

const { Option } = Select;

const Register = () => {
  const [form] = useForm();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const postData: any = usePost(RegisterUser);

  const { data: areaLists } = useFetch([QUERY_KEYS], () => areaList(), {
    onError: (error) => {
      message.error('Something went wrong');
    },
  });

  const onFinish = (values: any) => {
    const payload = {
      otp: params.otp,
      name: values.name,
      password: values.password,
      mobile_no: values.mobile_no,
      area: values.area,
      road: values.road,
      block: values.block,
      house: values.house,
      sector: values.sector,
    };

    try {
      postData.mutate(payload, {
        onSuccess: (data: any) => {
          message.success(data?.message);
          dispatch(setUser(data?.data));
          navigate(PRIVATE.HOME);
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
                    <Select placeholder="এলাকা দিন">
                      {areaLists?.data?.map((area: any) => (
                        <Option key={area.key} value={area.value}>
                          {area.value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Row
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Col>
                      <Form.Item label="ব্লক" name="block">
                        <Input placeholder="মোবাইল ব্লক দিন" />
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item label="সড়ক" name="road">
                        <Input placeholder="সড়ক দিন" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item label="বাসা নং" name="house">
                    <Input placeholder="বাসা নং দিন" />
                  </Form.Item>
                  <Form.Item label="সেক্টর" name="sector">
                    <Input placeholder="সেক্টর নং দিন" />
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
                    {/* <div style={{ marginTop: 20 }}>
                      <Link to={PUBLIC.SIGN_IN} style={{ color: 'black' }}>
                        লগইন করুন
                      </Link>
                    </div> */}
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
