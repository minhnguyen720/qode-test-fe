import { DisplayImageItem } from '../DetailModal/detail-modal.type';

export interface CommentFormProps {
  detailItem: DisplayImageItem;
  onCommentSubmit?: () => void;
}

export interface FieldType {
  comment: string;
}
