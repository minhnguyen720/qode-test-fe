'use client';

import { Upload, message, Tooltip, FloatButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BASE_URL } from '@/app/constants/common';
import { UploadImageProps } from './upload-image.type';

const UploadImage: React.FC<UploadImageProps> = ({ onUploadSuccessCallback }) => {
  return (
    <div className="w-1/2 flex flex-col gap-4">
      <Upload
        onChange={(info) => {
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            onUploadSuccessCallback?.();
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }}
        action={`${BASE_URL}/posts/upload`}
        headers={{
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*',
          authorization: 'authorization-text',
        }}
        showUploadList={false}
      >
        <Tooltip title="Upload new post">
          <FloatButton icon={<UploadOutlined />} shape="circle" type="primary" />
        </Tooltip>
      </Upload>
    </div>
  );
};

export default UploadImage;
