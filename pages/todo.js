import React from "react";
import qoreContext from "../qoreContext";

export default function Todo() {
  const items = qoreContext.view("allTodo").useListRow();
  const {
    insertRow,
    status,
  } = qoreContext.view("allTodo").useInsertRow();
  const inputRef = React.useRef(null);
  const { deleteRow } = qoreContext.view("allTodo").useDeleteRow();
  const { updateRow } = qoreContext.view("allTodo").useUpdateRow();
  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            ref={inputRef}
            onKeyPress={async (e) => {
              if (e.key === "Enter" && status !== "loading") {
                const value = e.currentTarget.value
                inputRef.current.value = "";
                await insertRow({
                  name: value,
                  description: "",
                  done: false,
                });
                items.revalidate();
              }
            }}
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <section className="main">
          <ul className="todo-list">
            {(items.data || []).map((item) => (
              <li key={item.id} className={item.done && "completed"}>
                <div className="view">
                  <input
                    onChange
                    className="toggle"
                    type="checkbox"
                    checked={item.done}
                    onChange={async (e) => {
                      await updateRow(item.id, {
                        done: e.currentTarget.checked,
                      });
                      items.revalidate();
                    }}
                  />
                  <label>{item.name}</label>
                  <button
                    className="destroy"
                    onClick={async (e) => {
                      await deleteRow(item.id);
                      items.revalidate();
                    }}
                  ></button>
                </div>
                <input className="edit" value="Create a TodoMVC template" />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}
