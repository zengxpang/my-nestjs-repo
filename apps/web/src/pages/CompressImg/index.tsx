import { request } from '@@/plugin-request';
import { InboxOutlined } from '@ant-design/icons';
import { ProForm, ProFormDigit } from '@ant-design/pro-components';
import { Form, Upload, UploadProps, message } from 'antd';
import { useState } from 'react';

interface ICompressImgProps {}

const { Dragger } = Upload;

const CompressImg = (props: ICompressImgProps) => {
  const [fileInfo, setFileInfo] = useState<{
    filePath: string;
    fileName: string;
  }>({
    fileName: '',
    filePath: '',
  });

  const uploadsProps: UploadProps = {
    name: 'file',
    multiple: false,
    capture: false,
    action: 'http://localhost:3000/compress/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setFileInfo({
          filePath: info.file.response,
          fileName: info.file.name,
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const handleFinish = async (values: any) => {
    const res = await request('/v/compress/compress', {
      params: {
        colours: values.colours,
        filePath: fileInfo.filePath,
      },
      responseType: 'arraybuffer',
    });
    const url = URL.createObjectURL(
      new Blob([res], {
        type: 'image/jpeg',
      }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = fileInfo.fileName;
    a.click();
    // 释放内存
    URL.revokeObjectURL(url);
    message.success('压缩成功');
  };

  return (
    <ProForm
      onFinish={handleFinish}
      layout={'horizontal'}
      initialValues={{
        colours: 256,
      }}
    >
      <ProFormDigit
        name="colours"
        label="颜色数量"
        placeholder={'请输入颜色数量'}
        rules={[
          {
            required: true,
            message: '请输入颜色数量!',
          },
        ]}
        fieldProps={{
          min: 1,
          max: 256,
        }}
        width="md"
      />
      <Form.Item
        label={'上传文件'}
        rules={[
          {
            required: true,
            message: '请上传文件!',
          },
        ]}
      >
        <Dragger {...uploadsProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">仅支持单文件上传</p>
        </Dragger>
      </Form.Item>
    </ProForm>
  );
};

CompressImg.defaultProps = {};

export default CompressImg;
