import React from "react";
import qoreContext from "../qoreContext";

export default function Todo() {
  const items = qoreContext.views.todoDefaultView.useListRow();
  const {
    insertRow,
    status,
  } = qoreContext.views.todoDefaultView.useInsertRow();
  const inputRef = React.useRef(null);
  const { deleteRow } = qoreContext.views.todoDefaultView.useDeleteRow();
  const { updateRow } = qoreContext.views.todoDefaultView.useUpdateRow();
  return (
    <>
      <section class="todoapp">
        <header class="header">
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
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus
          />
        </header>
        <section class="main">
          <ul class="todo-list">
            {(items.data || []).map((item) => (
              <li key={item.id} class={item.done && "completed"}>
                <div class="view">
                  <input
                    onChange
                    class="toggle"
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
                    class="destroy"
                    onClick={async (e) => {
                      await deleteRow(item.id);
                      items.revalidate();
                    }}
                  ></button>
                </div>
                <input class="edit" value="Create a TodoMVC template" />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
}
