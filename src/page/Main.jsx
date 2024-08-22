// Main.jsx

import React, { useState, useEffect } from 'react';
import Banner from '../component/Banner';
import Search from '../component/Search';
import Filter from '../component/Filter';
import PostList from '../component/PostList';
import Category from '../component/Category';
import LikeRecent from '../component/LikeRecent';
import PostDetail from '../component/PostDetail';
import { Status } from '../Context/StatusContext';

export default function Main() {
  const { likedPosts, setLikedPosts, recentPosts, setRecentPosts, selectedPost, setSelectedPost, showDetail, setShowDetail, myPost, setMyPost, data, setData } = Status();
  const [originalData, setOriginalData] = useState([]); // 원본 데이터를 저장하는 상태
  const [category, setCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(0);
  const [statuses, setStatuses] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [priceRange, setPriceRange] = useState({ start: 0, end: Infinity });

  // 롯데타워 좌표 객체
  const lotteTower = {
    lat: 37.5103,
    lon: 127.1025
  };

  // 거리 계산 함수
  function distance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // 두 지점 간의 거리 (단위: km)
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const handleSearch = (searchKeyword) => {
    setKeyword(searchKeyword);
    setCurrentPage(0);
    handleApplyFilters(keyword);
  };

  const handleSort = (newSortBy) => {
    setSortBy(newSortBy);
    handleApplyFilters(sortBy);
  };

  const onClickCategory = () => {
    setCategory(!category);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleApplyFilters(selectedCategory);
  };

  const handleLimitChange = (priceStart, priceEnd) => {
    setPriceRange({ start: Number(priceStart) || 0, end: Number(priceEnd) || Infinity });
    handleApplyFilters(priceRange);
  };

  const handleStatusChange = (status) => {
    setStatuses(status);
    handleApplyFilters();
  };

  const handleConditionChange = (condition) => {
    setConditions(conditions);
    handleApplyFilters();
  };

  const handleApplyFilters = (filters) => {
    console.log('Applying filters:', filters);
  
    if (!filters) {
      return;
    }
  
    setStatuses(filters.statuses || []);
    setConditions(filters.conditions || []);
    setPriceRange({ 
      start: filters.priceStart || 0, 
      end: filters.priceEnd || Infinity 
    });
  
    let filteredPosts = originalData.filter(post => {
      const statusMatch = !filters.statuses || filters.statuses.length === 0 || filters.statuses.includes(post.status);
      const conditionMatch = !filters.conditions || filters.conditions.length === 0 || filters.conditions.includes(post.condition);
      const priceMatch = (post.price >= (filters.priceStart || 0)) && (post.price <= (filters.priceEnd || Infinity));
      const keywordMatch = 
        post.title.toLowerCase().includes(keyword.toLowerCase()) || 
        post.description.toLowerCase().includes(keyword.toLowerCase());
      const categoryMatch = selectedCategory === null || post.category === selectedCategory;
      return statusMatch && conditionMatch && priceMatch && keywordMatch && categoryMatch;
    });
    switch (sortBy) {
      case 'newest':
        filteredPosts = filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'highPrice':
        filteredPosts = filteredPosts.sort((a, b) => a.price - b.price);
        break;
      case 'lowestPrice':
        filteredPosts = filteredPosts.sort((a, b) => b.price - a.price);
        break;
      case 'closest':
        filteredPosts = filteredPosts.sort((a, b) => 
          distance(lotteTower.lat, lotteTower.lon, a.coordinate.lat, a.coordinate.lon) - 
          distance(lotteTower.lat, lotteTower.lon, b.coordinate.lat, b.coordinate.lon)
        );
        break;}

        
    setData(filteredPosts);
    setCurrentPage(0);
  };

  const handleSubmit = (newPost) => {
    const updatedPosts = [newPost, ...originalData];
    setOriginalData(updatedPosts); // 원본 데이터 업데이트
    setData(updatedPosts); // 필터링된 데이터 업데이트
    setMyPost(prevPosts => [newPost, ...prevPosts]);
  };

  const addToLike = (post) => {
    setLikedPosts(prevLike => {
      const isLiked = prevLike.some(p => p.id === post.id);
      return isLiked ? prevLike.filter(p => p.id !== post.id) : [...prevLike, post];
    });
  };

  const isPostLiked = (post) => {
    return likedPosts.some(p => p.id === post.id);
  };

  const addToRecent = (post) => {
    setRecentPosts(prevRecent => {
      if (!prevRecent.find(p => p.id === post.id)) {
        return [...prevRecent, post];
      }
      return prevRecent;
    });
  };

  const handlePostClick = (post) => {
    addToRecent(post);
    setSelectedPost(post);
    setShowDetail(true);
  };

  // 데이터를 초기화하거나, 서버에서 데이터를 가져오는 로직을 useEffect에서 관리
  useEffect(() => {
    setOriginalData(data); // 원본 데이터 설정
  }, []); // data가 변경될 때마다 실행

  return (
    <div>
      <div className="max-w-5xl ml-auto mr-auto pb-[60px]">
        <Banner />
        <Search onSearch={handleSearch} />
      </div>
      <Filter
        onStatusChange={handleStatusChange}
        onLimitChange={handleLimitChange}
        onApplyFilters={handleApplyFilters}
        onSubmit={handleSubmit}
        postLength={data.length}
        onMenu={onClickCategory}
        onConditionChange={handleConditionChange}
      />
      <div className="relative bg-[#f0f5f5]">
        <div className="w-screen max-w-5xl ml-auto mr-auto bg-[#F1F1F1]">
          {category && 
            <Category onCategoryChange={handleCategoryChange} /> 
          }
          <PostList
            posts={data}
            onPostClick={handlePostClick}
            sortBy={sortBy}
            setSortBy={handleSort}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <LikeRecent onPostClick={handlePostClick} />
      </div>
      {showDetail && <PostDetail addToLike={addToLike} post={selectedPost} onClose={() => setShowDetail(false)} isPostLiked={isPostLiked(selectedPost)} />}
    </div>
  );
}
