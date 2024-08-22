import React from 'react';
import { Status } from '../Context/StatusContext'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './PostDetail.css';

export default function PostDetail({ post, onClose }) {
  const { toggleLike, likedPosts } = Status();

  const handleLikeClick = () => {
    toggleLike(post);
  };

  const isLiked = likedPosts.some(likedPost => likedPost.id === post.id);

  const dateDifference = (date) => {
    const postDate = new Date(date);
    const currentDate = new Date();

    const timeDifference = currentDate - postDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      return '오늘';
    } else if (daysDifference < 7) {
      return `${daysDifference}일 전`;
    } else if (daysDifference < 30) {
      const weeksDifference = Math.floor(daysDifference / 7);
      return `${weeksDifference}주 전`;
    } else {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const postYear = postDate.getFullYear();
      const postMonth = postDate.getMonth();

      const monthsDifference = (currentYear - postYear) * 12 + (currentMonth - postMonth);
      return `${monthsDifference}달 전`;
    }
  };

  return (
    <div className='postDetail fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
      <style>
        {`
          .material-symbols-outlined.liked-icon {
            font-variation-settings: 'FILL' ${isLiked ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}
      </style>
      <div className='w-[900px] bg-white rounded-lg overflow-hidden shadow-lg relative'>
        <button 
          className='absolute top-4 right-4 text-white bg-black px-4 py-2 rounded'
          onClick={onClose}
        >
          닫기
        </button>
        <div className='flex'>
          <div className='w-1/2 aspect-square'>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              navigation
              modules={[Navigation]}
            >
              {post.image.map((src, index) => (
                <SwiperSlide key={index}>
                  <div className='relative w-full aspect-square flex justify-center items-center overflow-hidden bg-gray-200'>
                    <img src={src} alt={`Post image ${index}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='w-1/2 py-[15px] px-[30px] text-left'>
            <p className='text-[24px] font-[600] py-[15px]'>{post.title}</p>
            <p className='text-[40px] font-[500] pb-[15px]'>{post.price}<span className='font-[400] text-[24px] px-[5px]'>원</span></p>
            <div className='flex items-center pb-[15px]'>
              <div className='flex items-center text-[#CCC] pr-[15px]'>
                <span className="material-symbols-outlined text-[22px] pr-[5px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                 favorite
                </span>
                <p>{likedPosts.length}</p>
              </div>
              <div className='flex items-center pr-[15px]'>
                <span className="material-symbols-outlined text-[22px] text-[#CCC] pr-[5px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                visibility
                </span>
              </div>
              <div className='text-[#CCC] flex items-center'>
                <span className="material-symbols-outlined text-[22px] pr-[5px]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>
                schedule
                </span>
                <p className='font-[500]'>{dateDifference(post.date)}</p>
              </div>
            </div>
            <div className='text-sm mb-2 flex'>
              <span className='w-[90px] font-[500] text-[#CCC]'>상품상태</span><p>{post.condition}</p>
            </div>
            <div className='text-sm mb-2 flex'>
              <span className='w-[90px] font-[500] text-[#CCC]'>배송비</span><p>{post.delivery}</p> 
            </div>
            <div className='text-left py-[15px]'>
              <p>{post.description}</p>
            </div>
            <div className='absolute bottom-[20px] right-0 flex justify-start'>
              <button 
                className='w-[55px] aspect-square rounded-lg flex justify-center items-center mr-4 shadow-custom-light hover:shadow-custom-dark'
                onClick={handleLikeClick}
              >
                <span className='material-symbols-outlined liked-icon text-[24px] text-[#db0075]'>
                  favorite
                </span>
              </button>
              <button className='text-[15px] font-[500] text-[#fff] bg-[rgb(39,92,179)] w-[130px] h-[55px] rounded-lg mr-[15px] shadow-custom-light hover:shadow-custom-dark'>
                구매하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
