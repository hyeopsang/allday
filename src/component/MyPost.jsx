import React, { useState, useEffect } from 'react';
import { Status } from '../Context/StatusContext'; 

const iconStyle = {
    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    display: 'inline-block',
    verticalAlign: 'middle',
};

export default function MyPost({ post, index, handlePostClick, DeletePost, handleEditClick }) {
    const PostStatus = ["판매중", "예약중", "판매완료"];
    const { data, setData, setMyPost, likedPosts } = Status();
    const [postStatus, setPostStatus] = useState(post.status);

    const handleChange = (e) => {
        const { value } = e.target;
        setPostStatus(value);
        setData(prevData => prevData.map((p, idx) => idx === index ? { ...p, status: value } : p));
        setMyPost(prevMyPost => prevMyPost.map((p, idx) => idx === index ? { ...p, status: value } : p));
    };

    const handleClick = () => {
        handlePostClick(post);
    };

    const handleDeleteClick = () => {
        DeletePost(index);
    };

    const handleEdit = () => {
        handleEditClick(index);
    };

    return (
        <li className="w-full h-[200px] flex items-center justify-start cursor-pointer">
            <div className='w-fit h-full flex justify-start items-center text-[20px]' onClick={handleClick}>
                <div className="w-[200px] aspect-square flex justify-start items-center overflow-hidden">
                    <img src={post.image[0]} className="w-full h-auto object-cover" alt={post.title} />
                </div>
                <p className="w-[212px] text-center">{post.title}</p>
                <p className="w-[212px] text-center">{post.price} 원</p>
                <div className='w-[100px] text-center'>
                    <span className="material-symbols-outlined text-[#111] px-[5px]" style={iconStyle}>
                        favorite
                    </span>
                    {likedPosts.length}
                </div>
            </div>
            <div className='w-[130px] flex justify-center text-[18px]'>
                <select className='w-full px-[20px] py-[10px] text-start' value={postStatus} onChange={handleChange}>
                    {PostStatus.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            <div className='w-[180px] justify-between text-center text-[20px]'>
                <button className='w-1/2 text-center' onClick={handleEdit}>수정</button>
                <button className='w-1/2 text-center' onClick={handleDeleteClick}>삭제</button>
            </div>
        </li>
    );
}
