import React from 'react';
import { Modal } from '../shared/detail';
import openModalHandler from '../shared/detail';
import { openModalHandler, Modal } from '.detail';

function Home() {
  return (
    <div>
      <Modal open={openModalHandler} header="modal" />
    </div>
  );
}

export default Home;
