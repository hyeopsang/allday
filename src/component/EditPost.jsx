import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './AddPost.css';
import { Status } from '../Context/StatusContext';

const EditPost = ({ index, onClose }) => {
    const { data, setData, setMyPost } = Status();
    const [post, setPost] = useState(null);
    const [isFreeShipping, setIsFreeShipping] = useState(false);

    useEffect(() => {
        const postToEdit = data[index];
        setPost(postToEdit);
        setIsFreeShipping(postToEdit.delivery === "무료 배송");
    }, [index, data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    

    const handleShippingChange = (e) => {
        const { checked } = e.target;
        setIsFreeShipping(checked);
        setPost(prevPost => ({
            ...prevPost,
            delivery: checked ? "무료 배송" : ""
        }));
    };

    const handleSubmit = () => {
        setData(prevData => prevData.map((p, idx) => idx === index ? post : p));
        setMyPost(prevMyPost => prevMyPost.map((p, idx) => idx === index ? post : p));
        onClose();
    };

    const categoryList = [
        "남성 의류", "여성 의류", "신발", "가방 / 지갑", "시계", "쥬얼리",
        "디지털", "가전 제품", "스포츠 / 레저", "차량 / 오토바이", "키덜트",
        "예술 / 희귀 / 수집품", "음반 / 악기", "도서 / 티켓 / 문구", "뷰티 / 미용",
        "가구 / 인테리어", "생활 / 주방용품", "공구 / 산업용품", "식품",
        "유아동 용품", "반려동물", "기타"
    ];

    const handleImageDelete = (index) => {
        setPost(prevPost => ({
            ...prevPost,
            image: prevPost.image.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPost(prevPost => ({
                    ...prevPost,
                    image: [...prevPost.image, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="absolute w-[500px] p-[15px] bg-white top-0 left-0 translate-x-1/2 z-50 shadow-md rounded-lg">
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
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <Swiper
                    spaceBetween={10}
                    slidesPerView={2.2}
                    navigation
                    modules={[Navigation]}
                >
                    {post.image.map((imageUrl, index) => (
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
                value={post.title}
                onChange={handleChange}
                placeholder="제목"
            />
            <p className='w-full py-[5px]'>상품 가격</p>
            <div className="flex items-center mb-[10px]">
                <input
                    className="w-full p-[10px] border rounded-lg"
                    type="number"
                    name="price"
                    value={post.price}
                    onChange={handleChange}
                    placeholder='₩ 가격을 입력해주세요'
                />
            </div>
            <div className='flex justify-end'>
                <div className='w-[150px] mr-[10px]'>
                    <p className='py-[5px]'>카테고리</p>
                    <select
                        className="w-full rounded-lg mb-[10px] p-[10px] border"
                        name="category"
                        value={post.category}
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
                        value={post.condition}
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
                            disabled={isFreeShipping}
                            name="delivery"
                            value={isFreeShipping ? "" : post.delivery}
                            onChange={handleChange}
                        />
                        <div className='w-[150px] flex items-center'>
                            <input
                                type='checkbox'
                                className='mx-[5px]'
                                checked={isFreeShipping}
                                onChange={handleShippingChange}
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
                value={post.description}
                onChange={handleChange}
                placeholder="물품에 대한 설명을 자세하게 입력해주세요"
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

export default EditPost;
