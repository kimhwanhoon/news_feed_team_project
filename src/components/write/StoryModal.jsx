import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import InputArea from './InputArea';
import Catagory from './Catagory';
import { FaRegPaperPlane } from 'react-icons/fa';

const StoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const options = ['1', '2', '3', '4'];
  const [selectedOption, setSelectedOption] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const clickOutside = (event) => {
    if (modalRef.current === event.target) {
      closeModal();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.addEventListener('mousedown', clickOutside);
    };
  }, []);

  return (
    <div>
      <StButton onClick={openModal}>
        <FaRegPaperPlane />
        나의 이야기를 써보세요
      </StButton>
      {isOpen && (
        <StModalBox>
          <StModalItem>
            <StModalContents>
              <p>
                <InputArea selectedOption={selectedOption} closeModal={closeModal} />
              </p>

              {/* <p>
                <Catagory options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
              </p> 태그 기능 삭제로 안씀 */}
            </StModalContents>
          </StModalItem>
        </StModalBox>
      )}
    </div>
  );
};

export default StoryModal;

const StModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
  position: relative;
  background-color: transparent;
  border-radius: 0px;
  box-sizing: border-box;
`;

const StModalItem = styled.div``;

const StModalContents = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 140%;
  padding: 0px 12px;
  position: relative;
  border: 6px solid;
`;
const StButton = styled.button`
  border: none;
  cursor: pointer;
  border-radius: 8px;
  background-color: rgba(34, 73, 201, 0.5);
  color: rgb(0, 0, 0);
  height: 40px;
  width: 200px;
  box-shadow: 5px 5px 5px #778899;
`;

const StSB = styled.button`
  font-size: 14px;
  line-height: 1em;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  pointer-events: auto;
  border: none;
  white-space: nowrap;
  transition: all 0.1s ease-out 0s;
  color: rgb(255, 255, 255);
  background-color: rgb(39, 24, 137);
  overflow: hidden;
  touch-action: none;
`;
