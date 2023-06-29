import React from 'react';
import { openModalHandler, Modal } from '../shared/detail';


function Home() {
  return (
    <div>
      <Modal open={openModalHandler} header="modal" />
    </div>
  );
}

export default Home;
