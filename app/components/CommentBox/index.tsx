import React from 'react';
import { CommentBoxProps } from './comment-box.type';

const CommentBox: React.FC<CommentBoxProps> = ({ createdBy, createdAt, content }) => {
  return (
    <div className="p-2 border border-gray-300 rounded">
      <p className="text-sm text-gray-500">
        <strong>{createdBy}</strong> on {new Date(createdAt).toLocaleString()}
      </p>
      <p className="mt-1">{content}</p>
    </div>
  );
};

export default CommentBox;
