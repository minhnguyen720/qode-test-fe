import { CommentOutlined } from '@ant-design/icons';
import { Tooltip, Button, Image } from 'antd';
import { PostProps } from './post.type';

const Post: React.FC<PostProps> = ({ item, openModalCallback }) => {
  return (
    <div key={item.id} className="flex flex-col gap-2">
      <Image src={item.url} width={300} alt="Uploaded Image" />
      <Tooltip title="Comments">
        <Button
          type="dashed"
          shape="circle"
          icon={<CommentOutlined />}
          onClick={() => {
            openModalCallback?.(item);
          }}
        />
      </Tooltip>
    </div>
  );
};

export default Post;
