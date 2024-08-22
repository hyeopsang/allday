import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './LikeRecent.css';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Status } from '../Context/StatusContext';  // Import the context

export default function LikeRecent({ onPostClick }) {  // 받아온 핸들러 사용
  const { likedPosts, recentPosts } = Status();  // Use the context

  return (
    <div className="fixed top-[120px] right-[30px] w-[130px] h-fit bg-[#fff] cursor-pointer rounded-md shadow-lg overflow-hidden">
      <div className="flex flex-wrap w-full text-center text-[12px] border-b bg-white">
        <p className="w-full py-[10px] font-[800]">
          <Link to={'/profile/like'}>찜한 상품 ({likedPosts.length})</Link>
        </p>
      </div>
      <div className="flex flex-col w-full text-center text-[12px]">
        <p className="w-full py-[10px] font-[800] border-b bg-white">최근 본 상품 ({recentPosts.length})</p>
        <div className="relative w-full h-fit likeRecent">
            {recentPosts.length > 0 ? (
              <Swiper
                slidesPerView={1} // 한 번에 하나의 슬라이드만 표시
                spaceBetween={0} // 슬라이드 사이의 간격
                navigation // 네비게이션 화살표 활성화
                modules={[Navigation]} // 필요한 모듈 활성화
              >
                {recentPosts.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="w-[130px] h-fit bg-white mx-auto border-b cursor-pointer flex flex-col items-center justify-center"
                      onClick={() => onPostClick(item)}
                    >
                      <img
                        className="object-cover" // 이미지 크기 조정
                        src={item.image}
                        alt={item.title}
                      />
                      <p className={recentPosts.length > 1 ? "w-full h-[40px] text-ellipsis overflow-hidden text-nowrap my-[5px] text-center" : "w-full h-fit text-ellipsis overflow-hidden text-nowrap my-[5px] text-center"}>
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="w-full py-[5px] text-center">최근 본 상품이 없습니다</p>
            )}
        </div>
      </div>
    </div>
  );
}
