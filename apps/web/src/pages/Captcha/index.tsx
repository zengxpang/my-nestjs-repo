import { useRequest } from '@@/exports';
import { request } from '@@/plugin-request';
import {
  DashboardOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Image, Space, Spin, message } from 'antd';
import { useState } from 'react';

interface ICaptchaProps {}

const Captcha = (props: ICaptchaProps) => {
  const [captchaUrl, setCaptchaUrl] = useState<string>('');

  const { loading: captchaLoading } = useRequest(
    {
      url: '/captcha',
      method: 'get',
    },
    {
      onSuccess: () => {
        setCaptchaUrl('/api/captcha');
      },
    },
  );

  const handleFinish = async (values: {
    username: string;
    password: string;
    captcha: string;
  }) => {
    await request('/login', {
      method: 'post',
      data: values,
    });
    message.success('登录成功！');
  };

  const handleResetCaptcha = () => {
    setCaptchaUrl(captchaUrl + '?t=' + Math.random());
  };

  return (
    <>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
        onFinish={handleFinish}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Form.Item>
          <Space>
            <Spin spinning={captchaLoading}>
              <Image src={captchaUrl} alt={'captcha'} preview={false} />
            </Spin>
            <Button type="primary" onClick={handleResetCaptcha}>
              刷新验证码
            </Button>
          </Space>
        </Form.Item>
        <ProFormText.Password
          name="captcha"
          fieldProps={{
            size: 'large',
            prefix: <DashboardOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入验证码'}
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        />
      </LoginForm>
    </>
  );
};

Captcha.defaultProps = {};

export default Captcha;
