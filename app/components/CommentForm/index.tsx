import { Button, Form, FormProps, Input, message } from 'antd';
import { CreateCmtDto } from '../DetailModal/detail-modal.type';
import { GUEST_USER_ID, BASE_URL } from '@/app/constants/common';
import axios from 'axios';
import { CommentFormProps, FieldType } from './comment-form.type';
import { useMemo } from 'react';

const CommentForm: React.FC<CommentFormProps> = ({ detailItem, onCommentSubmit }) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const payload: CreateCmtDto = {
      postId: detailItem.id,
      createdBy: GUEST_USER_ID,
      content: values.comment,
    };
    axios
      .post(`${BASE_URL}/comments`, payload)
      .then(() => {
        message.success('Comment submitted successfully');
        onCommentSubmit?.();
        form.resetFields();
      })
      .catch((error) => {
        message.error('Failed to submit comment: ' + error);
      });
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error('Failed to submit comment: ' + errorInfo);
    form.resetFields();
  };

  const cmt = Form.useWatch('comment', form);
  const disableSubmit = useMemo(() => {
    return cmt === undefined || cmt.trim() === '';
  }, [cmt]);

  return (
    <Form name="comment-form" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" form={form}>
      <Form.Item name="comment">
        <Input placeholder="Write a comment..." variant="underlined" />
      </Form.Item>
      <Form.Item label={null}>
        <div className="flex justify-end">
          <Button htmlType="submit" disabled={disableSubmit} variant="link" color="default">
            Comment
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
