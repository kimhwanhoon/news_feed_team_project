import React from 'react';
import { Modal } from '../shared/detail';
import openModalHandler from '../shared/detail';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <h2>메인 페이지</h2>
      <div>
        <Modal open={openModalHandler} header="modal"/>
      </div>
    </div>
  );
}

export default Home;
