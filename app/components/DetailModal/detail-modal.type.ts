import { ModalProps } from 'antd';

export interface DisplayImageItem {
  id: string;
  url: string;
}

export interface DetailModalProps extends ModalProps {
  detailItem: DisplayImageItem;
}

export interface Comment {
  id: string;
  postId: string;
  createdBy: string;
  createdAt: string;
  content: string;
}

export interface CreateCmtDto {
  postId: string;
  content: string;
  createdBy: string;
}
