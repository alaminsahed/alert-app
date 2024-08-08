import { CopyOutlined, PhoneOutlined } from '@ant-design/icons';
import { Card, Collapse, message } from 'antd';
import { divisions } from 'utils/numbers';

const LawEnforcementContactListPage = () => {
  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success('Phone number copied to clipboard!');
      })
      .catch((err) => {
        message.error('Failed to copy');
      });
  };

  return (
    <Card
      title={'Law Enforcement Contact List'}
      bodyStyle={{
        padding: '34px 90px',
      }}
    >
      {divisions.map((div, i) => (
        <Collapse
          items={[
            {
              key: i,
              label: div.name,
              children: div.areas.map((a, i) => (
                <Collapse
                  items={[
                    {
                      key: i + 1,
                      label: a.name,
                      children: a.contacts.map((c) => (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div>{c.number}</div>
                          <div>
                            <PhoneOutlined
                              style={{
                                height: 30,
                                width: 30,
                                cursor: 'pointer',
                              }}
                              onClick={() => {
                                window.location.href = `tel:${c.raw}`;
                              }}
                            />
                            <CopyOutlined
                              style={{
                                height: 30,
                                width: 30,
                                cursor: 'pointer',
                              }}
                              onClick={() => copyToClipboard(c.number)}
                            />
                          </div>
                        </div>
                      )),
                    },
                  ]}
                  style={{
                    marginBottom: '10px',
                  }}
                />
              )),
            },
          ]}
          style={{
            marginBottom: '10px',
          }}
        />
      ))}
    </Card>
  );
};

export default LawEnforcementContactListPage;
