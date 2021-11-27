import React, { useState, useEffect } from "react";
import { db, collection, getDocs, addDoc } from "../firebase";

function Columns() {
  const [column, setColumn] = useState({
    name: "",
    position: 0,
  });
  const [columnList, setColumnList] = useState([]);
  useEffect(() => {
    getColumn()
      .then(() => {})
      .catch((e) => console.log(e.message));
  }, []);
  async function addColumn(e) {
    e.preventDefault();
    try {
      const columnRef = await addDoc(collection(db, "columns"), column);
      console.log("Document written with ID: ", columnRef.id);
      getColumn();
      setColumn({ name: "", position: 0 });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function getColumn() {
    const columnSnap = await getDocs(collection(db, "columns"));
    const columnArr = columnSnap.docs.map((doc) => {
      return {
        id: doc.id,
        data: doc.data(),
      };
    });
    setColumnList(columnArr);
  }
  return (
    <div>
      <h4>Columns</h4>
      <form onSubmit={addColumn}>
        <label>Column name </label>
        <input
          value={column.name}
          onChange={(e) => setColumn({ ...column, name: e.target.value })}
        />
        <label>Position </label>
        <input
          type="number"
          value={column.position}
          onChange={(e) => setColumn({ ...column, position: e.target.value })}
        />
        <button type="submit">Add</button>

        <hr />
      </form>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Position</th>
            </tr>
          </thead>
          <tbody>
            {columnList.map(({ id, data }, i) => {
              return (
                <tr key={id}>
                  <th scope="row">{i + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.position}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Columns;
