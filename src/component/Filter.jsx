import React, { useState, useEffect } from 'react';
import AddPost from './AddPost';

export default function Filter({ postLength, onStatusChange, onLimitChange, onApplyFilters, onSubmit, onMenu }) {
  const [filter, setFilter] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [price, setPrice] = useState({
    first: '',
    last: ''
  });
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);

  // Toggle filter visibility
  const toggleFilter = () => setFilter(!filter);

  const handleStatusChange = (status) => {
    setSelectedStatuses(prevStatuses => {
      const newStatuses = prevStatuses.includes(status)
        ? prevStatuses.filter(s => s !== status)
        : [...prevStatuses, status];
      
      // 상태 업데이트 후 비동기적으로 필터 적용
      setTimeout(() => onStatusChange(newStatuses), 0);
      
      return newStatuses;
    });
  };

  const handleConditionChange = (condition) => {
    setSelectedConditions(prevConditions => {
      const newConditions = prevConditions.includes(condition)
        ? prevConditions.filter(c => c !== condition)
        : [...prevConditions, condition];
      return newConditions;
    });
  };
  

  // Handle price input changes
  const handleChangePrice = (e) => {
    const { name, value } = e.target;
    setPrice(prevPrice => ({
      ...prevPrice,
      [name]: value
    }));
  };

  const handleApplyFilters = () => {
    const filters = {
      statuses: selectedStatuses,
      conditions: selectedConditions,
      priceStart: parseInt(price.first) || 0,
      priceEnd: parseInt(price.last) || Infinity
    };
    onLimitChange(price.first, price.last);
    onApplyFilters(filters);  // 이 부분이 Main.jsx의 handleApplyFilters를 호출합니다
    setFilter(false);
  };

  const statuses = ['판매중', '예약중', '판매완료'];
  const conditions = ["새상품", "중고상품"];

  return (
    <div className="w-full border-t border-b text-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center h-12 relative">
        <span className="material-symbols-outlined text-[34px] font-[300] cursor-pointer" onClick={() => onMenu()}>
          menu
        </span>
        <div className='flex items-center'>
          <span class="material-symbols-outlined text-[20px] mr-[10px]">
          my_location
          </span>
          서울 송파구 신천동 28"
        </div>
        <div className="flex items-center">
          <button
            className={`w-[35px] h-[35px] mr-[10px] group hover:w-[125px] rounded-full shadow-md flex justify-center items-center text-base font-semibold transition-all duration-200 ${
              filter ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={toggleFilter}
          >
            <span
              className={`material-symbols-outlined text-lg font-medium ${
                filter ? 'text-white' : 'text-gray-500'
              }`}
            >
              page_info
            </span>
            <p className='w-[0px] text-[14px] text-center text-nowrap overflow-hidden group-hover:px-[10px] group-hover:w-[70px] transition-all duration-200'>필터</p>
          </button>
          {filter && (
            <div className="w-[700px] px-[30px] py-[15px] bg-white shadow-lg absolute top-[49px] right-0 z-50 rounded-b-md">
              <div className="flex flex-wrap">
                <div className="w-full p-[15px]  mx-auto flex justify-between">
                  <div className="w-[100px] pr-[20px]">
                    <p className="text-sm font-semibold mb-[10px]">판매상태</p>
                    <ul className="flex flex-col">
                      {statuses.map((status, index) => (
                        <li className="w-full flex justify-between items-center mb-2" key={index}>
                          <label className="text-sm">{status}</label>
                          <input
                            type="checkbox"
                            value={status}
                            checked={selectedStatuses.includes(status)}
                            onChange={() => handleStatusChange(status)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-[100px] pr-[20px]">
                    <p className="text-sm font-semibold mb-[10px]">상품상태</p>
                    <ul className="flex flex-col">
                      {conditions.map((condition, index) => (
                        <li className="w-full flex justify-between items-center mb-2" key={index}>
                          <label className="text-sm">{condition}</label>
                          <input
                            type="checkbox"
                            value={condition}
                            checked={selectedConditions.includes(condition)}
                            onChange={() => handleConditionChange(condition)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-[300px]">
                    <p className="text-sm font-semibold mb-[10px]">가격</p>
                    <div className="flex items-center">
                      <input
                        className="w-[100px] p-[5px] border border-gray-300 rounded"
                        type="text"
                        name="first"
                        value={price.first}
                        onChange={handleChangePrice}
                      />
                      <span className="mx-2 font-semibold">원</span>
                      <span className="mx-2 font-semibold">~</span>
                      <input
                        className="w-[100px] p-[5px] border border-gray-300 rounded"
                        type="text"
                        name="last"
                        value={price.last}
                        onChange={handleChangePrice}
                      />
                      <span className="mx-2 font-semibold">원</span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button
                    className="bg-blue-500 mr-[15px] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
                    onClick={handleApplyFilters}
                  >
                    적용하기
                  </button>
                </div>
              </div>
            </div>
          )}
          <button
            className={`w-[35px] h-[35px] group hover:w-[125px] rounded-full shadow-md flex justify-center items-center text-base font-semibold transition-all duration-200 ${
              addPost ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setAddPost(!addPost)}
          >
            <span
              className={`material-symbols-outlined text-lg font-medium ${
                addPost ? 'text-white' : 'text-gray-500'
              }`}
            >
              add
            </span>
            <p className="w-[0px] text-[14px] text-center text-nowrap overflow-hidden group-hover:px-[10px] group-hover:w-[70px] transition-all duration-200">
              판매하기
            </p>
          </button>

          {addPost && <AddPost onSubmit={onSubmit} postLength={postLength} setAddPost={setAddPost} />}
        </div>
      </div>
    </div>
  );
}
