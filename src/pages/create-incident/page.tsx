import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import { useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import {
  CameraIcon,
  CrowdIcon,
  DakatiIcon,
  FireIcon,
  GunfireIcon,
  MicIcon,
  VandalismIcon,
} from 'components/svg/sidebarIcon';
import styles from './create-incident.module.css';
import { usePost } from 'hooks/useCustomApi';
import { createIncident } from 'api/dashboard';

const { TextArea } = Input;

const CreateIncidentPage = () => {
  const fileInputRef = useRef<any>(null);
  const [photo, setPhoto] = useState<any>(null);
  const [audio, setAudio] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>(1);

  const create = usePost(createIncident);

  const [form] = Form.useForm();
  const incidentTypes = [
    {
      key: 1,
      label: 'ডাকাতি',
      icon: <DakatiIcon />,
    },
    { key: 2, label: 'আগুন', icon: <FireIcon /> },
    {
      key: 3,
      label: 'ধ্বংসাত্মক কার্যকলাপ',
      icon: <VandalismIcon />,
    },
    { key: 4, label: 'জনসমাগম', icon: <CrowdIcon /> },
    { key: 5, label: 'গোলাগুলি', icon: <GunfireIcon /> },
  ];

  const handleDivClick = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event?.target?.files[0];
    if (file) {
      setPhoto(file);
    }
  };
  const makeDefaults = () => {
    setPhoto(null);
    setAudio(null);
    setSelectedType(1);
  };

  const onFinish = (values: any) => {
    const formdata: any = new FormData();
    formdata.append('incident_type_id', selectedType);
    formdata.append('note', values?.details);
    formdata.append('request_medium', '3');
    if (audio) {
      formdata.append('audio', audio);
    }
    if (photo) {
      formdata.append('image', photo);
    }

    create.mutate(formdata, {
      onSuccess: (data) => {
        message.success('Create Success');
        form.resetFields();
        makeDefaults();
      },
      // onError: (error: any) => {
      //   if (
      //     error &&
      //     error?.code === STATUS.UNPROCESSABLE_ENTITY &&
      //     Object.keys(error?.errors).length > 0
      //   ) {
      //     const errorMessage: any = Object.keys(error.errors)?.map(
      //       (key: any) => ({
      //         name: key,
      //         errors: error.errors[key],
      //       }),
      //     );
      //     form.setFields(
      //       errorMessage.map((item: any) => ({
      //         name: item.name === 'file_name' ? 'file' : item?.name,
      //         errors: item.errors,
      //       })),
      //     );
      //   } else {
      //     errorResponseHandler(error, 'Unable to add');
      //   }
      // },
    });
  };

  return (
    <Card
      title="Create Incident"
      bodyStyle={{
        padding: '24px 100px',
      }}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        layout="vertical"
      >
        <Form.Item label="Incident Type" required>
          <Row gutter={16}>
            {incidentTypes.map((type) => (
              <Col key={type.key}>
                <div
                  onClick={() => setSelectedType(type.key)}
                  style={{
                    width: '100px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: `2px solid ${
                      selectedType === type.key ? '#FF3737' : '#d9d9d9'
                    }`,
                    backgroundColor:
                      selectedType === type.key ? '#f5f5f5' : 'white',
                  }}
                >
                  {type?.icon}
                  <p
                    style={{
                      margin: 0,
                      textAlign: 'center',
                    }}
                  >
                    {type.label}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Form.Item>
        <Form.Item
          label="Details"
          name="details"
          rules={[{ required: true, message: 'This field is required!' }]}
        >
          <TextArea
            rows={3}
            placeholder="Write Details"
            maxLength={100}
            showCount
          />
        </Form.Item>
        <Row gutter={16}>
          <Col sm={24} md={12} lg={12} xl={12}>
            <Form.Item label="Upload Audio">
              <div className={styles.upload_audio_photo}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                  }}
                >
                  <MicIcon />
                  <span>Add Voice Input</span>
                </div>
              </div>
            </Form.Item>
          </Col>
          <Col sm={24} md={12} lg={12} xl={12}>
            <Form.Item label="Upload Photo">
              <div
                className={styles.upload_audio_photo}
                onClick={() => {
                  if (!photo) {
                    handleDivClick();
                  }
                }}
                style={{
                  cursor: photo ? 'default' : 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                  }}
                >
                  {photo ? (
                    <>
                      <span>{photo?.name}</span>
                      <CloseOutlined />
                    </>
                  ) : (
                    <>
                      <CameraIcon />
                      <span>Upload Photo</span>
                    </>
                  )}
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: 'end',
          }}
        >
          <Button htmlType="button">Cancel</Button>
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default CreateIncidentPage;
