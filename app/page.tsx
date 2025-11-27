'use client';

import { useEffect, useState, useCallback } from 'react';
import { DetailModal, UploadImage } from './components';
import axios from 'axios';
import { message, Spin, Typography } from 'antd';
import { BASE_URL } from './constants/common';
import Post from './components/Post';

const { Title } = Typography;

interface Post {
  createdAt: string;
  createdBy: string;
  id: string;
  isHidden: boolean;
  url: string;
}

interface DisplayImageItem {
  id: string;
  url: string;
}

export default function Home() {
  const [displayImageItems, setDisplayImageItems] = useState<DisplayImageItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentDetailUrl, setCurrentDetailUrl] = useState<DisplayImageItem | undefined>(undefined);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${BASE_URL}/posts`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      const newUrlList: DisplayImageItem[] = response.data.map((post: Post) => ({ id: post.id, url: `${BASE_URL}/posts/${post.id}` }));
      setDisplayImageItems(newUrlList);
    } catch (error) {
      setDisplayImageItems([]);
      message.error('Failed to fetch posts: ' + error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleOpenModal = async (detail: DisplayImageItem) => {
    setOpenModal(true);
    setCurrentDetailUrl(detail);
  };

  return (
    <>
      <Title>My Post</Title>
      <UploadImage onUploadSuccessCallback={fetchPosts} />
      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          {displayImageItems.map((item) => (
            <Post key={item.id} item={item} openModalCallback={handleOpenModal} />
          ))}
        </div>
      )}
      {currentDetailUrl && openModal && (
        <DetailModal footer={null} open={openModal} detailItem={currentDetailUrl} onCancel={() => setOpenModal(false)} />
      )}
    </>
  );
}
