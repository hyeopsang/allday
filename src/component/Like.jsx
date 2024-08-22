import React from 'react';
import { Status } from '../Context/StatusContext';  // Import the context
import Post from './Post';
import PostDetail from './PostDetail';

export default function Like() {
  const { likedPosts, setLikedPosts, recentPosts, setRecentPosts, selectedPost, setSelectedPost, showDetail, setShowDetail, myPost, setMyPost } = Status();  

  // Function to handle post click
  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowDetail(true);
  };
  const isPostLiked = (post) => {
    return likedPosts.some(p => p.id === post.id);
  };
  const addToLike = (post) => {
    setLikedPosts(prevLike => {
      // Check if the post is already liked
      const isLiked = prevLike.some(p => p.id === post.id);
      
      if (isLiked) {
        // Remove from liked posts
        return prevLike.filter(p => p.id !== post.id);
      } else {
        // Add to liked posts
        return [...prevLike, post];
      }
    });
  };

  return (
    <div className="w-full py-[15px] pt-8">
      <h1 className="text-xl font-[800] mb-4">찜 목록</h1>
      <ul className="grid grid-cols-5 gap-[11px]">
        {likedPosts.length > 0 ? (
          likedPosts.map(post => (
            <Post 
              key={post.id} 
              post={post} 
              handlePostClick={handlePostClick}  // Pass the function as a prop
            />
          ))
        ) : (
          <p>찜한 게시물이 없습니다.</p>
        )}
      </ul>
      {showDetail && (
        <PostDetail
          post={selectedPost}
          onClose={() => setShowDetail(false)}
          isPostLiked={isPostLiked} // Provide a dummy function or handle liking in another way
          addToLike={addToLike}
        />
      )}
    </div>
  );
}
