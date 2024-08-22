import { useState } from 'react';
import { Status } from '../Context/StatusContext'; 
import AddPost from './AddPost';
import MyPost from './MyPost';
import PostDetail from './PostDetail';
import EditPost from './EditPost';


export default function MyPostList() {
    const { likedPosts, selectedPost, setSelectedPost, showDetail, setShowDetail, myPost, setMyPost, data, setData, toggleLike } = Status();  
    const [editPost, setEditPost] = useState(null);
    const [addPost, setAddPost] = useState(false);

    const onClickAdd = () => {
        setAddPost(!addPost);
    }

    const handlePostClick = (post) => {
        setSelectedPost(post);
        setShowDetail(true);
    };

    const isPostLiked = (post) => {
        return likedPosts.some(p => p.id === post.id);
    };  

    const DeletePost = (index) => {
        setData(prevData => prevData.filter((p, idx) => idx !== index));
        setMyPost(prevMyPost => prevMyPost.filter((p, idx) => idx !== index));
    };

    const handleEditClick = (index) => {
        setEditPost(index);
    };

    const handleSubmit = (newPost) => {
        const updatedPosts = [newPost, ...data];
        setData(updatedPosts);
        setMyPost(prevPosts => [newPost, ...prevPosts]);
    };
    
    return (
      <div className="w-full py-[15px] pt-8">
        <div className='w-full flex justify-between items-center'>
            <p className="text-[28px] font-[800] mb-4">상품</p>
            <div className='flex items-center bg-blue-100 px-[10px] py-[5px] cursor-pointer' onClick={() => onClickAdd()}>
                <span className="material-symbols-outlined text-[18px]">
                add
                </span>
                <p className='text-[15px]'>판매하기</p>
            </div>
        </div>
        {addPost &&
            <AddPost
                onSubmit={handleSubmit}
                setAddPost={setAddPost}
            />
        }
        <div className='w-full flex justify-start items-center font-[400] text-[20px] border-y border-[#111] mb-[15px]'>
            <p className='w-[200px] text-center'>이미지</p>
            <p className='w-[212px] text-center'>글 제목</p>
            <p className='w-[212px] text-center'>가격</p>
            <p className='w-[100px] text-center'>찜</p>
            <p className='w-[130px] text-center'>상태</p>
            <p className='w-[180px] text-center'>수정</p>
        </div>
        <ul className="grid grid-cols-1 gap-[11px]">
            {myPost.length > 0 ? (
                myPost.map((post, index) => (
                    <MyPost 
                        key={index} 
                        post={post} 
                        index={index}
                        handlePostClick={handlePostClick}  
                        DeletePost={DeletePost}
                        handleEditClick={handleEditClick}
                        toggleLike={toggleLike}
                        isPostLiked={isPostLiked(post)}
                        className="cursor-pointer"
                    />
                ))
            ) : (
                <p>판매 중인 게시글이 없습니다.</p>
            )}
        </ul>
        {showDetail && (
            <PostDetail
                post={selectedPost}
                onClose={() => setShowDetail(false)}
            />
        )}
        {editPost !== null && (
            <EditPost
                index={editPost}
                onClose={() => setEditPost(null)}
            />
        )}
      </div>
    )
}
