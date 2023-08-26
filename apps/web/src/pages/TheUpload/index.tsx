import { request } from '@@/plugin-request';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Space, Upload, message } from 'antd';

const { Dragger } = Upload;

const uploadsProps: UploadProps = {
  name: 'xxx',
  multiple: true,
  capture: false,
  action: 'http://localhost:3000/v1/the-upload/album2',
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
};

const TheUpload = () => {
  const handleDownload = async () => {
    await request('/api/the-upload/export');
    message.success('下载成功');
  };

  const handleDownZip = async () => {
    const res = await request('/api/the-upload/stream', {
      method: 'get',
      responseType: 'blob',
    });
    const url = URL.createObjectURL(
      new Blob([res], {
        // type: 'application/zip',
      }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zxp.zip';
    a.click();
    // 释放内存
    URL.revokeObjectURL(url);
    message.success('下载压缩包成功');
  };

  return (
    <Space direction={'vertical'}>
      <Dragger {...uploadsProps}>
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
