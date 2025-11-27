import { message, Modal, Spin, Image } from 'antd';
import { Comment, DetailModalProps } from './detail-modal.type';
import { useState, useEffect, useCallback } from 'react';
import { BASE_URL } from '@/app/constants/common';
import CommentBox from '../CommentBox';
import axios from 'axios';
import CommentForm from '../CommentForm';

const DetailModal: React.FC<DetailModalProps> = ({ detailItem, open, ...rest }) => {
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = useCallback(async () => {
    if (!detailItem) return;
    try {
      setModalLoading(true);
      const response = await axios.get(`${BASE_URL}/comments/${detailItem.id}`);
      setComments(response.data ?? []);
    } catch (error) {
      message.error('Failed to fetch detail: ' + error);
    } finally {
      setModalLoading(false);
    }
  }, [detailItem]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <>
      {modalLoading ? (
        <Spin />
      ) : (
        <Modal open={open} {...rest} className="overflow-y-auto max-h-[700px] py-6" width={1000} closable={false} destroyOnHidden={true}>
          <div className="flex justify-center mb-8">
            <Image src={detailItem?.url} alt="Uploaded Image" width={300} />
          </div>
          <div className="flex flex-col gap-2">
            <CommentForm detailItem={detailItem} onCommentSubmit={fetchComments} />
            {comments.length === 0 ? (
              <div className="w-full text-center text-neutral-500 text-lg">No comments yet.</div>
            ) : (
              comments.map((comment) => (
                <CommentBox key={comment.id} createdBy={comment.createdBy} createdAt={comment.createdAt} content={comment.content} />
              ))
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

export default DetailModal;
