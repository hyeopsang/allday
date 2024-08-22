import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './AddPost.css';

const AddPost = ({ onSubmit, postLength, setAddPost }) => {
  const categoryList = [
    "남성 의류", "여성 의류", "신발", "가방 / 지갑", "시계", "쥬얼리",
    "디지털", "가전 제품", "스포츠 / 레저", "차량 / 오토바이", "키덜트",
    "예술 / 희귀 / 수집품", "음반 / 악기", "도서 / 티켓 / 문구", "뷰티 / 미용",
    "가구 / 인테리어", "생활 / 주방용품", "공구 / 산업용품", "식품",
    "유아동 용품", "반려동물", "기타"
  ];

  const [postData, setPostData] = useState({
    id: postLength + 1,
    title: '',
    category: '',
    price: '',
    description: '',
    condition: '새상품',
    date: new Date().toISOString().slice(0, 10),
    image: [],
    delivery: '',
    coordinate: { "lat": 37.5103, "lon": 127.1025 }
  });

  const [isFreeShipping, setIsFreeShipping] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostData(prevData => ({
        ...prevData,
        image: [...prevData.image, imageUrl]
      }));
    }
  };

  const handleImageDelete = (index) => {
    setPostData(prevData => ({
      ...prevData,
      image: prevData.image.filter((_, i) => i !== index)
    }));
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsFreeShipping(checked);

    setPostData(prevData => ({
      ...prevData,
      delivery: checked ? '무료 배송' : ''
    }));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setIsFreeShipping(false);
    setPostData(prevData => ({
      ...prevData,
      delivery: value
    }));
  };

  const handleSubmit = () => {
    if (!postData.title || !postData.category || !postData.price || !postData.description || postData.image.length === 0) {
      alert('제목, 카테고리, 가격, 설명, 이미지는 필수 입력 항목입니다.');
      return;
    }

    onSubmit(postData);

    setPostData({
      id: postLength + 1,
      title: '',
      category: '',
      price: '',
      description: '',
      condition: '새상품',
      date: new Date().toISOString().slice(0, 10),
      image: [],
      delivery: '',
      coordinate: { "lat": 37.5103, "lon": 127.1025 }
    });
    setIsFreeShipping(false);
    setAddPost(false);
  };

  return (
    <div className="fixed w-[500px] p-[15px] bg-white top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 shadow-md rounded-lg">
      <div className="mb-[10px] addPost">
        <div className='w-[50px] aspect-square flex justify-center items-center rounded-lg border-[2px] border-[#275CB3] cursor-pointer mb-[10px]'>
          <label className='pt-[5px] cursor-pointer' htmlFor='imgUpload'>
            <span className="material-symbols-outlined text-[#275CB3]">
              add_photo_alternate
            </span>
          </label>
        </div>
        
        <input
          type="file"
          accept="image/*"
          id='imgUpload'
          onChange={handleImageChange}
          style={{display:'none'}}
        />
        <Swiper
          spaceBetween={10}
          slidesPerView={2.2}
          navigation
          modules={[Navigation]}
        >
          {postData.image.map((imageUrl, index) => (
            <SwiperSlide key={index} className="relative">
              <img src={imageUrl} alt="미리보기 이미지" className="w-[200px] h-[200px] object-cover" />
              <button
                className="absolute top-[3px] right-[10px] bg-[#333]/80 text-white w-[20px] aspect-square flex justify-center items-center rounded-full z-10"
                onClick={() => handleImageDelete(index)}
              >
                <p>X</p>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p className='w-full py-[5px]'>제목</p>
      <input
        className="w-full mb-[10px] p-[10px] border rounded-lg"
        type="text"
        name="title"
        placeholder="제목"
        value={postData.title}
        onChange={handleChange}
      />
      <p className='w-full py-[5px]'>상품 가격</p>
      <div className="flex items-center mb-[10px]">
        <input
          className="w-full p-[10px] border rounded-lg"
          type="number"
          name="price"
          value={postData.price}
          placeholder='₩ 가격을 입력해주세요'
          onChange={handleChange}
        />
      </div>
      <div className='flex justify-end'>
        <div className='w-[150px] mr-[10px]'>
          <p className='py-[5px]'>카테고리</p>
          <select
            className="w-full rounded-lg mb-[10px] p-[10px] border"
            name="category"
            value={postData.category}
            onChange={handleChange}
          >
            <option value="">카테고리 선택</option>
            {categoryList.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className='w-[150px]'>
          <p className='py-[5px]'>상품 상태</p>
          <select
            className="w-full rounded-lg mb-[10px] p-[10px] border"
            name="condition"
            value={postData.condition}
            onChange={handleChange}
          >
            <option value="새상품">새상품</option>
            <option value="중고상품">중고상품</option>
          </select>
        </div>
      </div>
      <div className='w-full flex justify-end items-center'>
        <div className='w-[310px] flex flex-wrap justify-start items-center'>
          <p className='w-[300px] text-left py-[5px]'>택배 가격</p>
          <div className='flex justify-between'>
            <input
              type='number'
              placeholder='₩ 택배 가격'
              className='w-[150px] mb-[10px] p-[10px] border rounded-lg mr-[10px]'
              value={isFreeShipping ? '' : postData.delivery}
              onChange={handleInputChange}
              disabled={isFreeShipping}
            />
            <div className='w-[150px] flex items-center'>
              <input
                type='checkbox'
                className='mx-[5px]'
                checked={isFreeShipping}
                onChange={handleCheckboxChange}
              />
              <p className='text-[#888] text-[12px] px-[5px]'>무료 배송</p>
            </div>
          </div>
        </div>
      </div>
      <p className='w-full py-[5px]'>자세한 설명</p>
      <textarea
        className="w-full h-[150px] p-[10px] border mb-[10px] rounded-lg"
        name="description"
        placeholder="물품에 대한 설명을 자세하게 입력해주세요"
        value={postData.description}
        onChange={handleChange}
      />
      <button
        className="w-full p-[10px] bg-blue-500 text-white rounded-lg"
        onClick={handleSubmit}
      >
        제출
      </button>
    </div>
  );
};

export default AddPost;
