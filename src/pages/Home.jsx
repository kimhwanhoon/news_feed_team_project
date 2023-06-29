import Header from 'components/Header';
import React from 'react';
import { styled } from 'styled-components';
import { openModalHandler, Modal } from '.detail';

function Home() {
  return (
    <>
    <StyledHome>
      <Header />
      <div></div>
      <div></div>
    </StyledHome>
    <Modal open={openModalHandler} header="modal" />
    </>
  );
}

export default Home;

const StyledHome = styled.div`
  height: 100vh;
  background-color: #999;
`;
