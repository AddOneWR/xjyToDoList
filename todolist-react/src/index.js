import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ToDoList from './js/TodoList';
import TopBar from './js/TopBar';

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render( <App />, document.getElementById('root'));
ReactDOM.render( <ToDoList />, document.getElementById('todoList'));
ReactDOM.render( <TopBar />, document.getElementById('topBar'));

registerServiceWorker();
