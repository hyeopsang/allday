import React, { createContext, useState, useContext } from 'react';
import { Data } from '../Data';

const useStatusContext = createContext();

export const Provider = ({ children }) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetail, setShowDetail] = useState(false); // 추가된 부분
  const [myPost, setMyPost] = useState([]);
  const [data, setData] = useState(Data);

  const toggleLike = (postId) => {
    setLikedPosts((prevLikedPosts) => {
      if (prevLikedPosts.includes(postId)) {
        return prevLikedPosts.filter((id) => id !== postId);
      } else {
        return [...prevLikedPosts, postId];
      }
    });
  };

  return (
    <useStatusContext.Provider value={{ toggleLike, likedPosts, setLikedPosts, recentPosts, setRecentPosts, selectedPost, setSelectedPost, showDetail, setShowDetail, myPost, setMyPost, data, setData }}>
      {children}
    </useStatusContext.Provider>
  );
};

export const Status = () => useContext(useStatusContext);
