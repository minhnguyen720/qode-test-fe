import { DisplayImageItem } from '../DetailModal/detail-modal.type';

export interface PostProps {
  item: DisplayImageItem;
  openModalCallback?: (item: DisplayImageItem) => void;
}
