import { request } from '@@/plugin-request';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Space, Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'xxx',
  multiple: true,
  action: 'http://192.168.2.33:3000/v1/the-upload/album2',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
  method: 'post',
};

const TheUpload = () => {
  const handleDownload = async () => {
    await request('/the-upload/export');
    message.success('下载成功');
  };

  const handleDownZip = async () => {
    // 因为返回的是文件流，我们只接fetch转blob执行
    const res = await fetch('/the-upload/stream').then((res) =>
      res.arrayBuffer(),
    );
    console.log(res);
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([res]));
    a.download = 'zxp.zip';
    a.click();
    //todo  下载的压缩包出错解压不了
    message.success('下载压缩包成功');
  };

  return (
    <Space direction={'vertical'}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">支持上传单个文件或者批量上传</p>
      </Dragger>

      <Button type={'primary'} onClick={handleDownload}>
        下载接口
      </Button>
      <Button type={'primary'} danger onClick={handleDownZip}>
        下载压缩包
      </Button>
    </Space>
  );
};

TheUpload.defaultProps = {};

export default TheUpload;
