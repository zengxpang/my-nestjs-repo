import { request } from '@@/plugin-request';
import { PageContainer } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { useState } from 'react';

const DoubleToken = () => {
  const [test, setTest] = useState<string>('');
  const [test2, setTest2] = useState<string>('');

  const handleLogin = () => {
    request('/user/login', {
      method: 'post',
      data: {
        username: 'zxp',
        password: '123456',
      },
    })
      .then((res: { access_token: string; refresh_token: string }) => {
        const { access_token, refresh_token } = res;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        message.success('登陆成功！');
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handleTest = () => {
    request('/user/test', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
      .then((res) => {
        setTest(res);
        message.success('访问成功！');
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handleTest2 = () => {
    request('/user/test2')
      .then((res) => {
        setTest2(res);
        message.success('访问成功！');
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  const handleClear = () => {
    localStorage.clear();
    message.success('清除成功！');
  };

  const handleRefresh = async () => {
    await request('/user/refresh', {
      method: 'get',
      params: {
        refresh_token: localStorage.getItem('refresh_token'),
      },
    })
      .then((res: { access_token: string; refresh_token: string }) => {
        const { access_token, refresh_token } = res;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        message.success('刷新成功！');
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '双Token验证',
      }}
    >
      <Space style={{ marginBottom: 20 }}>
        <Button type={'primary'} onClick={handleLogin}>
          登陆
        </Button>
        <Button type={'primary'} onClick={handleTest}>
          test
        </Button>
        <Button type={'primary'} onClick={handleTest2}>
          test2
        </Button>
        <Button type={'primary'} danger onClick={handleClear}>
          清除Token
        </Button>
        <Button type={'primary'} onClick={handleRefresh}>
          刷新Token
        </Button>
      </Space>
      <div style={{ fontSize: 20, fontWeight: 'bold' }}>
        <p>需要登陆才可访问---{test}</p>
        <p>不用登陆既可访问---{test2}</p>
      </div>
    </PageContainer>
  );
};

export default DoubleToken;
/*
// 如果用axios的话在拦截器中做，由于这里是umi，不想在拦截器中写了，这个只是用来测试的前端项目
// 接口都是不同项目的就不统一配置了
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let { data, config } = error.response;
    //  防止refresh接口失效,又继续调用refresh接口进入循环
    if (data.statusCode === 401 && !config.url.includes('/user/refresh')) {
      const res = await refreshToken();
      if(res.status === 200) {
      // 执行上次失败的请求
        return axios(config);
      } else {
        throw res.data
      }
    } else {
      return error.response;
    }
  }
)
 */
