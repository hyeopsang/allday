import React from 'react';

const Category = ({ onCategoryChange }) => {
  const categories = [
    "전체보기", "남성 의류", "여성 의류", "신발", "가방 / 지갑", "시계", "쥬얼리",
    "디지털", "가전 제품", "스포츠 / 레저", "차량 / 오토바이", "키덜트",
    "예술 / 희귀 / 수집품", "음반 / 악기", "도서 / 티켓 / 문구", "뷰티 / 미용",
    "가구 / 인테리어", "생활 / 주방용품", "공구 / 산업용품", "식품",
    "유아동 용품", "반려동물", "기타"
  ];

  return (
    <ul className="absolute z-20 w-fit h-[400px] overflow-y-scroll text-[#333] text-[12px] font-[600] flex flex-col items-center flex-nowrap bg-[#f0f4f8] shadow-lg">
      {categories.map((cat, index) => (
        <li
          key={index}
          className='cursor-pointer text-[14px] font-[500] w-[150px] px-[10px] py-[10px] bg-white border-b border-[#888/50] hover:shadow-[0_2px_3px_rgba(0,0,0,0.23)]'
        >
          <p
            onClick={() => {
              onCategoryChange(cat === "전체보기" ? null : cat);
            }}
          >
            {cat}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Category;
