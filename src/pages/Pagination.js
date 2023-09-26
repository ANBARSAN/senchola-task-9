import React, { useEffect, useState } from "react";
import  { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../Style.css";
import Boxton from "../Boxton";

const Pagination = () => {
  const [todos, setTodos] = useState([]);
  const [todosPerPage, setTodosPerPage] = useState(10); //2.step
  const [currentPage, setCurrentPage] = useState(1); //3.stepd

  const [isLoading, setIsLoading] = useState(true);

  const numOfTotalPages = Math.ceil(todos.length / todosPerPage); //2.
  const pages = [...Array(numOfTotalPages + 1).keys()].slice(1); //2.

  const indexOfLastTodo = currentPage * todosPerPage; //3.40
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage; //3.10

  const visibleTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    setTimeout(() =>{
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => setTodos(res));
      setIsLoading(false);
    }, 2000)
  },[]);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  };

  const handleTodoComplete = (taskIndex) => {
    setTodos((todos) =>
      todos.map((todo, index) =>
        index === taskIndex
          ? {
              userId: todo.userId,
              id: todo.id,
              title: todo.title,
              completed: !todo.completed,
            }
          : todo
      )
    );
  };

  return (
    <div>
   <>
    
    <SkeletonTheme highlightColor="#e8ffd1"> 
      {
        isLoading 
        ?
        <>
        <Boxton/>  
        </>
      :
      <>
      <h1 className="text-start fw-bold my-4">React Todo List</h1>
      {/*3.changes in todos to visibleTodos */}
      {
        visibleTodos.map((todo, index) => (
        <div className="border border-dark p-2 my-3 text-capitalize" key={todo.id}>
          <input
            className="mx-2"
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleTodoComplete(index)} 
          />
          <span> {todo.title} </span>
        </div>
      ))
    }
      <div className="d-flex justify-content-start align-items-center gap">
        <span className="border border-dark" onClick={prevPageHandler}>
          prev
        </span>
        <p className="bot">
          {/*4.add onclick */}
          {/*5.current page active */}
          <div className="container">
          {pages.map((val, index) => (
            <>
              <span
                onClick={() => setCurrentPage(val)}
                className={` ${currentPage === val ? "active" : ""}`}
                key={val + "$"}
              >{`${val}`}</span>

              <span class="mx-1">{`${index !== pages.length-1 ? "|" : ""}`} </span> 
            </>
          ))}
       </div>
        </p>
        <span className="border border-dark" onClick={nextPageHandler}>
          next
        </span>

        <select onChange={(event) => setTodosPerPage(event.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
         
      </div>
     </>
}
          
      </SkeletonTheme>
         
    </>

      
     
    </div>    
  );
};

export default Pagination;
