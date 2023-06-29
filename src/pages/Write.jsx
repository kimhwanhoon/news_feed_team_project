import StoryModal from 'components/write/StoryModal';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Write = () => {
  const todos = useSelector((state) => {
    return state.write.todos;
  });
  console.log(todos);

  const dispatch = useDispatch();

  const onDeleteTodo = (id) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id
    });
  };
  return (
    <>
      <h2> 글쓰기 </h2>

      <StoryModal />

      {todos.map((todo) => {
        return (
          <div>
            <div
              key={todo.id}
              style={{
                border: '1px solid black',
                padding: '10px',
                margin: '10px',
                width: '300px',
                height: '250px'
              }}
            >
              <h5>{todo.title}</h5>

              <br />
              <h3>{todo.content}</h3>
              <h5>{todo.selectedOption}</h5>
              <button onClick={() => onDeleteTodo(todo.id)}>삭제</button>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Write;
