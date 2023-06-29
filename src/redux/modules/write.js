import uuid from 'react-uuid';

const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SWITCH_TODO = 'SWITCH_TODO';

const initialState = {
  todos: []
};

const write = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, action.payload]
      };

    case DELETE_TODO:
      return {
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };

    case SWITCH_TODO:
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isDone: !todo.isDone
            };
          } else {
            return todo;
          }
        })
      };

    default:
      return state;
  }
};

export default write;
