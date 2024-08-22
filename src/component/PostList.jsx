import React from 'react';
import Post from './Post';
import Pagination from './Pagination';

const PostList = ({ posts, onPostClick, sortBy, setSortBy, currentPage, setCurrentPage }) => {
  const postsPerPage = 10;

  // 페이지 변경 핸들러
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // 현재 페이지에 따른 게시물 목록 계산
  const offset = currentPage * postsPerPage;
  const currentPosts = posts.slice(offset, offset + postsPerPage);

  // 페이지 수 계산
  const pageCount = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="bg-[#f0f4f8]">
      <div className='w-full py-[15px] flex justify-end items-center'>
        <select className='px-[10px] py-[5px]' value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='newest'>최신순</option>
          <option value='closest'>가까운순</option>
          <option value='lowestPrice'>저가순</option>
          <option value='highPrice'>고가순</option>
        </select>
      </div>
      <ul className="grid grid-cols-5 gap-[11px] pb-[30px]">
        
        {currentPosts.length === 0 ? <p className='py-[30px]'>게시물을 찾을 수 없습니다.</p> : currentPosts.map(post => (
          <Post key={post.id} post={post} handlePostClick={onPostClick}/>
        ))}
      </ul>
      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageClick}
          forcePage={currentPage}
        />
      )}
    </div>
  );
};

export default PostList;
