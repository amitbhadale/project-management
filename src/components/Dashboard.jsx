import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc, setDoc, doc } from "../firebase";
import "./styles/dashboard.scss";

function Dashboard() {
  const [columnList, setColumnList] = useState([]);
  const [title, setTitle] = useState("");
  const [columnId, setColumnId] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [desc, setDesc] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setIdEdit] = useState("");
  useEffect(() => {
    getColumn();
    getTasks();
  }, []);
  useEffect(() => {}, [taskList]);
  async function getColumn() {
    const columnSnap = await getDocs(collection(db, "columns"));
    const columnArr = columnSnap.docs
      .map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })
      .sort((a, b) => a.data.position - b.data.position);
    setColumnList(columnArr);
  }
  async function addTask(e) {
    e.preventDefault();
    try {
      let dataObj = {
        description: desc,
        title: title,
        columnId: columnId,
      };
      if (editMode) {
        await setDoc(doc(db, "tasks", idToEdit), dataObj);
      } else {
        const taskRef = await addDoc(collection(db, "tasks"), dataObj);
        console.log("Document written with ID: ", taskRef.id);
      }
      setTitle("");
      setColumnId("");
      setDesc("");
      setEditMode(false);
      setShowAdd(false);
      getTasks();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function getTasks() {
    try {
      const taskSnap = await getDocs(collection(db, "tasks"));
      const taskArr = taskSnap.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
      setTaskList(taskArr);
    } catch (e) {
      console.log("error", e.message);
    }
  }
  async function editTask(task) {
    console.log("task id", task);
    setEditMode(true);
    setShowAdd(true);
    setIdEdit(task.id);
    setTitle(task.data.title);
    setDesc(task.data.description);
    setColumnId(task.data.columnId);
  }
  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setShowAdd(!showAdd)}
      >
        Add Task
      </button>
      {showAdd && (
        <div className="task__container">
          <div className="task__add">
            <form onSubmit={addTask}>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <label className="form-label">Task Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Column/Stage</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      required
                      value={columnId}
                      onChange={(e) => {
                        console.log("e", e);
                        setColumnId(e.target.value);
                      }}
                    >
                      <option defaultValue>--Select--</option>
                      {columnList.map(({ id, data }) => {
                        return (
                          <option key={id} value={id}>
                            {data.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary">
                      {editMode ? "Save" : "Add"} task
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="dash__container">
        {columnList.map(({ id, data }) => {
          return (
            <div className="dash__column" key={id}>
              <h4 className="dash__header">{data.name}</h4>
              <div className="task__container">
                {taskList.length > 0
                  ? taskList.map((task) => {
                      const { title, description, columnId } = task.data;
                      return (
                        <>
                          {columnId === id ? (
                            <div className="task__task" key={task.id}>
                              <div>
                                <h5>{title}</h5>
                              </div>
                              <p>{description}</p>
                              <button
                                type="button"
                                className="btn btn-link"
                                onClick={() => editTask(task)}
                              >
                                Edit Task
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      );
                    })
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Dashboard;
