import React, { useContext } from "react";
import "./ToDoList.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/validSlice";
import { updateToDo, deleteToDo } from "./service";
export default function Card(props) {
  const [isDoubleCheck, toggleDoubleCheck] = useState(props.item.isCompleted);
  const toDoArr = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  function markCompleteHandler() {
    toggleDoubleCheck(true);
    console.log(props.item);
    updateToDo(props.item).then((response) => {
      console.log(response);
      const arr = [...toDoArr];
      let obj = arr.filter((item) => item.id === response.id);

      obj.isCompleted = true;
      dispatch(addItem(arr));
      const arrayAsString = JSON.stringify(arr);
      localStorage.setItem("myArray", arrayAsString);
    });
  }
  function deleteHandler() {
    deleteToDo(props.item).then((id) => {
      const arr = toDoArr.filter((item) => item.id !== id);
      dispatch(addItem(arr));
      const arrayAsString = JSON.stringify(arr);
      localStorage.setItem("myArray", arrayAsString);
    });
  }
  return (
    <div className={!isDoubleCheck ? "card_cls" : "card_cls completed_cls"}>
      <p className={!isDoubleCheck ? "title" : "title completed_cls"}>
        {props.item.title}
      </p>
      <p className={!isDoubleCheck ? "body" : "body completed_cls"}>
        {props.item.body}
      </p>
      <div className="btn_grp">
        <button
          className={!isDoubleCheck ? "small" : "small backGrdGreen"}
          onClick={markCompleteHandler}
        >
          {!isDoubleCheck && <i className="ri-check-line"></i>}
          {isDoubleCheck && <i className="ri-check-double-line"></i>}
        </button>
        <button className="small" onClick={deleteHandler}>
          <i className="ri-delete-bin-6-line"></i>
        </button>
      </div>
    </div>
  );
}
