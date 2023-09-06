import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Space } from 'antd';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const handleClick = () => {
    const eventSource = new EventSource('http://localhost:3000/stream');
    eventSource.onmessage = (event) => {
      console.log(event.data);
    };
  };

  const handleClick2 = () => {
    const eventSource = new EventSource('http://localhost:3000/stream2');
    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };
  };

  const handleClick3 = () => {
    const eventSource = new EventSource('http://localhost:3000/stream3');
    eventSource.onmessage = (event) => {
      console.log(JSON.parse(event.data));
    };
  };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <Space>
          <Button type="primary" onClick={handleClick}>
            请求sse
          </Button>
          <Button type="primary" danger onClick={handleClick2}>
            请求sse2
          </Button>
          <Button type="primary" danger onClick={handleClick3}>
            请求sse3
          </Button>
        </Space>
      </div>
    </PageContainer>
  );
};

export default HomePage;
