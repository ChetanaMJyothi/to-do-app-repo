import React, { useEffect, useRef } from "react";
import { createNewToDo, getToDoList, deleteToDo } from "./service.js";
import Card from "./Card.js";
import "./ToDoList.css";
import { addItem } from "../redux/validSlice.js";
import { useDispatch, useSelector } from "react-redux";
function ToDoList() {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const bodyRef = useRef();
  const dataArr = useSelector((state) => state.counter.value);
  console.log(dataArr);
  const retrievedArrayAsString = localStorage.getItem("myArray");

  useEffect(() => {
    if (retrievedArrayAsString) {
      const retrievedArray = JSON.parse(retrievedArrayAsString);
      dispatch(addItem(retrievedArray));
    } else {
      getToDoList().then((response) => {
        console.log(response);
        dispatch(addItem(response));
        const arrayAsString = JSON.stringify(response);
        localStorage.setItem("myArray", arrayAsString);
      });
    }
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    let localStorageLength = retrievedArrayAsString.length;
    const newToDoObj = {
      id: localStorageLength + 1,
      title: titleRef.current.value,
      body: bodyRef.current.value,
      isCompleted: false,
    };
    createNewToDo(newToDoObj).then((response) => {
      dispatch(addItem([...dataArr, response]));
      const arrayAsString = JSON.stringify([...dataArr, response]);
      localStorage.setItem("myArray", arrayAsString);
      console.log(response);
    });
  }
  return (
    <div>
      <form onSubmit={submitHandler} className="form_cls">
        <label htmlFor="titleId">Title: </label>
        <input type="text" id="titleId" ref={titleRef} placeholder="Title" />
        <label htmlFor="contentId">Content: </label>
        <textarea
          type="text"
          id="contentId"
          rows="5"
          ref={bodyRef}
          placeholder="Type Content....."
        />
        <button type="submit" className="add_cls">
          <i class="ri-add-line"></i>
        </button>
      </form>

      <div className="cards">
        {dataArr.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default ToDoList;
