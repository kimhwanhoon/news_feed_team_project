import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Write from 'pages/Write';

const Router = () => {
  return (
    // 보일러플레이트
    <BrowserRouter>
      <Routes>
        {/* 페이지별로 다른 화면을 보여줄 수 있게 하는 놈 */}
        {/* 주소 localhost:3000/ => Home */}
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
