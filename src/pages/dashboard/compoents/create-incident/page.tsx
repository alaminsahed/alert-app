import { Card } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
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
import { DakatiIcon } from 'components/svg/sidebarIcon';

const CreateIncident = () => {
  const [selectedType, setSelectedType] = useState<any>(null);
  const [form] = useForm();
  const incidentTypes = [
    { key: 'robbery', label: 'ডাকাতি', icon: <DakatiIcon /> },
    { key: 'fire', label: 'অগ্নি', icon: 'fire.png' },
    { key: 'vandalism', label: 'ধ্বংসাত্মক কার্যকলাপ', icon: 'vandalism.png' },
    { key: 'crowd', label: 'জনসমাগম', icon: 'crowd.png' },
    { key: 'gunfire', label: 'গোলাগুলি', icon: 'gunfire.png' },
  ];

  const onFinish = (values: any) => {
    const loginData = {
      email: values.email,
      password: values.password,
    };
  };

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          justifyItems: 'center',
          alignItems: 'center',
        }}
      >
        <h4>Create Incident</h4>
      </div>
      <div>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          form={form}
          layout="vertical"
        >
          <Form.Item>
            <Row gutter={16} justify="center">
              {incidentTypes.map((type) => (
                <Col key={type.key}>
                  <div
                    onClick={() => setSelectedType(type.key)}
                    style={{
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
                    <p>{type.label}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
};

export default CreateIncident;
