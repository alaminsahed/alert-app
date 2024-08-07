import { ArrowLeftOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Image, Input, message, Result } from 'antd';
import { singleIncident } from 'api/dashboard';
import { Loader } from 'components/layout';
import { QUERY_KEYS } from 'constants/queryKeys';
import { useFetch } from 'hooks/useCustomApi';
import { useNavigate, useParams } from 'react-router-dom';

const { TextArea } = Input;

const IncidentDetailsPage = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError } = useFetch(
    [QUERY_KEYS.INCIDENTS, id],
    () => singleIncident(Number(id)),
    {
      onError: (error: any) => {
        message.error('An error occurred while fetching data.');
      },
      enabled: !!id,
    },
  );

  //   const onFinish = (values: any) => {
  //     const formdata: any = new FormData();
  //     formdata.append('incident_type_id', selectedType);
  //     formdata.append('note', values?.details);
  //     formdata.append('request_medium', '3');
  //     if (audio) {
  //       formdata.append('audio', audio);
  //     }
  //     if (photo) {
  //       formdata.append('image', photo);
  //     }

  //     create.mutate(formdata, {
  //       onSuccess: (data) => {
  //         message.success('Create Success');
  //         form.resetFields();
  //         makeDefaults();
  //       },
  //     });
  //   };

  return (
    <Card
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined />
          Incident Details
        </div>
      }
      bodyStyle={{
        padding: '34px ',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : !isError ? (
        <>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>ইনিসিডেন্ট ধরনঃ </span>
            <div>{data?.data?.incident_type?.name}</div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>রিমার্কসঃ </span>
            <div>{data?.data?.note}</div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>ছবিঃ </span>
            {data?.data?.image_url ? (
              <Image
                src={`${process.env.REACT_APP_IMAGE_URL}${data?.data?.image_url}`}
                height={300}
              />
            ) : (
              'N/A'
            )}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>ভয়েসঃ </span>
            {data?.data?.audio_url ? <div>ভয়েস প্লে করুন</div> : 'N/A'}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>ইনিশিয়েটর</span>
            <div>
              <div>{data?.data?.user?.name}</div>
              <div>
                <PhoneOutlined
                  style={{
                    marginRight: '5px',
                  }}
                />
                {data?.data?.user?.mobile_no}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Button>যাচাই করা হচ্ছে</Button>
            <Button type="primary">সবাইকে সতর্ক করুন</Button>
            <Button type="primary" danger>
              বাতিল করুন
            </Button>
          </div>
        </>
      ) : (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button type="primary" htmlType="button" href="/">
              Back Home
            </Button>
          }
        />
      )}
    </Card>
  );
};

export default IncidentDetailsPage;
