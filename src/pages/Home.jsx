import React from 'react';
import { openModalHandler, Modal } from '../shared/detail';
import Header from 'components/Header';
import styled from 'styled-components';


function Home() {
  return (
    <StyledHome>
      <Header />
      <div>
      {/* <Modal open={openModalHandler} header="modal" /> */}
      </div>
      <div>
        
      </div>
    </StyledHome>
  );
}


export default Home;
const StyledHome = styled.div`
  height: 100vh;
  background-color: #999;
`;