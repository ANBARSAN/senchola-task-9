import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [toDos, setToDos] = useState([]);
  const [noOfToDosPerPage, setNoOfToDosPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const toDosData = await response.json();
    setToDos(toDosData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalNoOfPages = Math.ceil(toDos.length / noOfToDosPerPage);

  const pages = [...Array(totalNoOfPages + 1).keys()].slice(1);

  const toDosPerPageOptions = [10, 20, 30, 50];

  const indexOfLastToDo = currentPage * noOfToDosPerPage;
  const indexOfFirstToDo = indexOfLastToDo - noOfToDosPerPage;
  const visibleToDos = toDos.slice(indexOfFirstToDo, indexOfLastToDo);

  const handlePreviousPageClick = () => {
    if (currentPage !== 1) {
      setCurrentPage((pre) => pre - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage !== totalNoOfPages) {
      setCurrentPage((pre) => pre + 1);
    }
  };

  const getTotalPages = (itemsPerPage) =>
    Math.ceil(toDos.length / itemsPerPage);

  const handleItemsPerPage = (e) => {
    setNoOfToDosPerPage(() => {
      if (currentPage > getTotalPages(e.target.value)) {
        setCurrentPage(1);
      }

      return e.target.value;
    });
  };

  const handleToDoComplete = (taskIndex) => {
    setToDos((toDos) =>
      toDos.map((toDo, index) =>
        index === taskIndex
          ? {
              userId: toDo.userId,
              id: toDo.id,
              title: toDo.title,
              completed: !toDo.completed,
            }
          : toDo
      )
    );
  };

  return (
    <div>
      <h1>Simple pagination example</h1>
      {visibleToDos.map((toDo, index) => (
        <div className="to-do-item" key={toDo.id}>
          <input
            type="checkbox"
            checked={toDo.completed}
            onChange={() => handleToDoComplete(index)}
          />
          <span>{toDo.title}</span>
        </div>
      ))}
      <div className="page-ignitions-container">
        <span className="page-ig-nav" onClick={handlePreviousPageClick}>
          Pre
        </span>
        <div className="page-values-container">
          {pages.map((val, index) => (
            <>
              <span
                onClick={() => setCurrentPage(val)}
                className={`page-val ${currentPage === val ? "active" : ""}`}
                key={val + "$"}
              >{`${val}`}</span>
              <span className="page-val-divider">{`${
                index !== pages.length - 1 ? "|" : ""
              }`}</span>
            </>
          ))}
        </div>
        <span className="page-ig-nav" onClick={handleNextPageClick}>
          Next
        </span>
        <div className="no-items-per-page-options">
          <span>No of items per page: </span>

          
          <select onChange={handleItemsPerPage}>
            {toDosPerPageOptions.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;