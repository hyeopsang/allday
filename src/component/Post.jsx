import React, { useState, useEffect } from 'react';

export default function Post({ post, handlePostClick }) {
  const lat = post.coordinate.lat
  const lon = post.coordinate.lon
  const handleClick = () => {
    console.log('Post clicked:', post);
    handlePostClick(post);
  };
  const [address, setAddress] = useState('');
  const apiKey = process.env.REACT_APP_KAKAO_KEY;

  useEffect(() => {
    const fetchAddress = async () => {
        try {
            const response = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`, {
                headers: {
                    Authorization: `KakaoAK ${apiKey}`
                }
            });
            const data = await response.json();
            if (data.documents && data.documents.length > 0) {
                setAddress(data.documents[0].address.address_name);
            } else {
                setAddress('주소를 찾을 수 없습니다.');
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            setAddress('주소를 가져오는 도중 오류가 발생했습니다.');
        }
    };

    fetchAddress();
  }, [lat, lon, apiKey]);

  return (
    <li className="bg-white h-fit rounded-md overflow-hidden shadow-md cursor-pointer" onClick={handleClick}>
      <div className="bg-white w-full aspect-square overflow-hidden flex justify-center items-center relative">
        {/* 상태에 따른 배경 레이어 */}
        {post.status === '예약중' && (
          <div className="absolute inset-0 bg-[#333]/60 flex justify-center items-center">
            <p className="w-[90px] h-[90px] aspect-square border border-white rounded-full bg-transparent text-[15px] text-white font-normal flex justify-center items-center">예약중</p>
          </div>
        )}
        {post.status === '판매완료' && (
          <div className="absolute inset-0 bg-[#333]/60 flex justify-center items-center">
            <p className="w-[90px] h-[90px] aspect-square border border-white rounded-full bg-transparent text-[15px] text-white font-normal flex justify-center items-center">판매완료</p>
          </div>
        )}
        <img className="w-full h-auto" src={post.image[0]} alt={post.title} />
      </div>
      <p className="w-full overflow-hidden text-start font-semi[800] text-[14px] text-[#333] px-[15px] py-[10px] border-b whitespace-nowrap truncate">{post.title}</p>
      <div className="w-full flex justify-between items-center py-[5px] px-[15px]">
        <p className="text-[16px] overflow-hidden font-[800] text-[#333]">{post.price}<span className="text-[12px] px-[5px]">원</span></p>
        <p className="text-[12px] overflow-hidden text-[#555]">{post.date}</p>
      </div>
      <div className='w-[180px] h-[40px] px-[8px] text-[14px] flex justify-center items-center'>
        <span className="material-symbols-outlined text-[#111] text-[20px] px-[5px]">
        location_on
        </span>
        <p className='text-ellipsis text-nowrap overflow-hidden text-[12px]'>{address}</p>
      </div>
    </li>
  );
}
