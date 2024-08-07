import { Card, Typography } from 'antd';
import { FC } from 'react';
import CountUp from 'react-countup';
import { FileTextOutlined } from '@ant-design/icons';
import './style.css';

const { Title } = Typography;

interface DashboardCardProps {
  icon: any;
  title: string;
  data: any;
  bgColor?: string;
  isCountAnimating?: boolean;
  iconColor?: string;
  isCountSign?: boolean;
  iconBgColor?: string;
  iconType?: 'svg' | 'icon';
}

const DashboardCard: FC<DashboardCardProps> = ({
  bgColor = 'white',
  data,
  icon: Icon,
  title,
  isCountAnimating = false,
  iconColor,
  isCountSign = false,
  iconBgColor = '#f3f6fd',
  iconType = 'icon',
}) => {
  return (
    <Card
      style={{
        border: '1px solid #E5E5E5',
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 10,
        boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <div
          className="dashboard-card-icon"
          style={{ background: iconBgColor }}
        >
          {iconType === 'svg' ? (
            <Icon
              style={{
                color: iconColor,
                height: '24px',
              }}
              fill={iconColor}
            />
          ) : (
            <Icon
              style={{
                fontSize: '1.2rem',
                color: iconColor,
              }}
            />
          )}
        </div>
        <div className="">
          <h5 className="dashboard-card-title">{title}</h5>
          <span className="dashboard-card-subtitle">
            {isCountSign && (
              <span
                style={{
                  fontSize: '1rem',
                  marginRight: '2px',
                }}
              >
                ৳
              </span>
            )}

            <CountUp
              start={0}
              end={data || 0}
              duration={isCountAnimating ? 3 : 0}
              // separator=","
              useGrouping
              preserveValue={isCountAnimating}
              style={{
                fontSize: '1rem',
              }}
              formattingFn={(value) =>
                value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;
