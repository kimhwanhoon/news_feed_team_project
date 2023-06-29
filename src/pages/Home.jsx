import Header from 'components/Header';
import React from 'react';
import { styled } from 'styled-components';
import { openModalHandler, Modal } from '../shared/detail';


function Home() {
  return (
    <div>
      <Modal open={openModalHandler} header="modal" />
    </div>)}

function Home() {
  return (
    <StyledHome>
      <Header />
      <div></div>
      <div></div>
    </StyledHome>
  );
}

export default Home;

const StyledHome = styled.div`
  height: 100vh;
  background-color: #999;
`;
