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
  const [selectedType, setSelectedType] = useState<any>(1);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [audioBlob, setAudioBlob] = useState<any>(null);
  const audioChunks = useRef<any>([]);
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('Media devices are not supported by this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        audioChunks.current = [];
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const sendAudio = () => {
    if (!audioBlob) {
      return null;
    }
    return audioBlob;
  };

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
    setSelectedType(1);
    setRecording(false);
    setMediaRecorder(null);
    setAudioBlob(null);
  };

  const onFinish = (values: any) => {
    const formdata: any = new FormData();
    formdata.append('incident_type_id', selectedType);
    formdata.append('note', values?.details);
    formdata.append('request_medium', '3');
    const audio = sendAudio();
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
      onError: (error: any) => {
        message.error('Something went wrong');
      },
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
              <div
                className={styles.upload_audio_photo}
                onClick={recording ? stopRecording : startRecording}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                  }}
                >
                  <MicIcon />
                  <span>
                    {recording ? 'Stop Recording' : 'Add Voice Input'}
                  </span>
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
