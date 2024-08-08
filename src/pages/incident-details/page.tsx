import { ArrowLeftOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Card, Image, message, Result } from 'antd';
import { incidentAction, singleIncident } from 'api/dashboard';
import { Loader } from 'components/layout';
import { QUERY_KEYS } from 'constants/queryKeys';
import { useFetch, usePost } from 'hooks/useCustomApi';
import { useNavigate, useParams } from 'react-router-dom';

const IncidentDetailsPage = () => {
  const navigate = useNavigate();
  const action = usePost(incidentAction);

  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, refetch } = useFetch(
    [QUERY_KEYS.INCIDENTS, id],
    () => singleIncident(Number(id)),
    {
      onError: (error: any) => {
        message.error('An error occurred while fetching data.');
      },
      enabled: !!id,
    },
  );

  const onAction = (values: any) => {
    const formdata: any = new FormData();
    formdata.append('id', values?.id);
    formdata.append('status', values?.status);
    action.mutate(formdata, {
      onSuccess: (data) => {
        message.success('Success');
        refetch();
      },
      onError: (error: any) => {
        message.error('Something went wrong');
      },
    });
  };

  return (
    <Card
      title={
        <div>
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined
              style={{
                marginRight: 10,
              }}
            />
            Incident Details
          </span>
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
              <Image src={`${data?.data?.image_url}`} height={300} />
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
            <Button
              htmlType="button"
              onClick={() =>
                onAction({
                  id: data?.data?.id,
                  status: 1,
                })
              }
              disabled={action.isLoading}
            >
              যাচাই করা হচ্ছে
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={() =>
                onAction({
                  id: data?.data?.id,
                  status: 2,
                })
              }
              disabled={action.isLoading}
            >
              সবাইকে সতর্ক করুন
            </Button>
            <Button
              type="primary"
              danger
              htmlType="button"
              onClick={() =>
                onAction({
                  id: data?.data?.id,
                  status: 3,
                })
              }
              disabled={action.isLoading}
            >
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
