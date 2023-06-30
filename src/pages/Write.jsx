import StoryModal from 'components/write/StoryModal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const Write = () => {
  const [category, setCategory] = useState(0);
  const [filteredTodos, setFilteredTodos] = useState([]);

  const todos = useSelector((state) => {
    return state.write.todos;
  });
  // console.log(todos);

  useEffect(() => {
    console.log(todos);
    const tempArray = todos.filter(function (todo) {
      if (category === 0) {
        return todo;
      } else {
        return todo.selectedOption === category;
      }
    });

    setFilteredTodos(tempArray);
  }, [category, todos]);

  // 카테고리로 필터링 한 녀석들

  const dispatch = useDispatch();

  const onDeleteTodo = (id) => {
    dispatch({
      type: 'DELETE_TODO',
      payload: id
    });
  };

  console.log('filteredTodos', filteredTodos);
  console.log('todos', filteredTodos);
  return (
    <>
      <h2> 글쓰기 </h2>

      <StoryModal />
      {/* 
      <button
        onClick={() => {
          setCategory(1);
        }}
      >
        1
      </button>
      <button
        onClick={() => {
          setCategory(2);
        }}
      >
        2
      </button>
      <button
        onClick={() => {
          setCategory(3);
        }}
      >
        3
      </button>
      <button
        onClick={() => {
          setCategory(4);
        }}
      >
        4
      </button> */}
      {filteredTodos.map((todo) => {
        return (
          <div>
            <div
              key={todo.id}
              style={{
                border: '1px solid black',
                padding: '10px',
                margin: '10px',
                width: '80%',
                height: '70%'
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
