import React, { useState } from 'react';
import { styled } from 'styled-components';

const Catagory = ({ options, selectedOption, setSelectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <DropdownWrapper>
        <DropdownHeader
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <StTag>{'태그'}</StTag>
          <StTag>:</StTag>
          <StTag>{selectedOption}</StTag>

          {/* <input  /> */}
        </DropdownHeader>
        {isOpen && (
          <DropdownList>
            {options.map((option) => (
              <DropdownItem
                key={option}
                onClick={() => {
                  handleOptionClick(option);
                }}
              >
                {option}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownWrapper>
    </div>
  );
};
export default Catagory;

const DropdownWrapper = styled.div`
  width: 300px;
  border: 1px solid #ccc;
`;

const DropdownHeader = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 200px;
  height: 50px;
`;

const StTag = styled.span`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  width: 100%;
`;
const DropdownItem = styled.div`
  &:hover {
    background-color: lightgray;
  }
`;
