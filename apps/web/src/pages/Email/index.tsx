import { request } from '@@/plugin-request';
import { UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Input, Space, Statistic, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

const { Countdown } = Statistic;

interface IEmailProps {}

const Email = (props: IEmailProps) => {
  const formRef = useRef<ProFormInstance>();
  const [disabled, setDisabled] = useState(true);
  const [isSended, setIsSended] = useState(false);
  
  const handleFinish = async (values: { email: string; code: string }) => {
    console.log(values);
    await request('/v/user/login', {
      method: 'POST',
      data: values
    })
    message.success('登录成功！');
  };

  const handleSendCode = async () => {
    const email = formRef.current?.getFieldValue('email');
    // 正则判断是否是邮箱格式
    const reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    const isEmail = reg.test(email);
    if (!isEmail) {
      message.error('请输入正确的邮箱格式！');
      return;
    }
    await request('/v/email/code', {
      params:{
        address:email
      }
    })
    message.success('发送成功！');
    setIsSended(true);
  };

  return (
    <>
      <LoginForm
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Github"
        subTitle="全球最大的代码托管平台"
        onFinish={handleFinish}
        formRef={formRef}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: '请输入邮箱!',
            },
            {
              type: 'email',
              message: '请输入正确的邮箱格式!',
            }
          ]}
        >
          <Space size={4}> 
            <Input
              placeholder={'请输入邮箱'}
              size="large"
              allowClear
              onChange={(e) => {
                setDisabled(!e.target.value);
              }}
              prefix={<UserOutlined className={'prefixIcon'} />}
            />
            {
              isSended ? <Countdown  value={Date.now()+60 * 1000} format={'s秒'} suffix='重发' valueStyle={{
                fontSize:16
              }} onFinish={()=>setIsSended(false)} />
              :
              <Button type="primary" onClick={handleSendCode} disabled={disabled}>
              发送验证码
              </Button>
            }  
          </Space>
        </Form.Item>
        <ProFormText
          name="code"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入验证码'}
          rules={[
            {
              required: true,
              message: '请输入验证码!',
            },
          ]}
        />
      </LoginForm>
    </>
  );
};

Email.defaultProps = {};

export default Email;
