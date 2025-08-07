document.addEventListener("DOMContentLoaded", () => {
  const inputbox = document.querySelector(".input_box");
  const addbutton = document.querySelector(".add_button");
  const list = document.querySelector(".tasklist");
  let todo = JSON.parse(localStorage.getItem("todo")) || [];
  todo.forEach((task) => rendertodolist(task));
  addbutton.addEventListener("click", () => {
    const inputtask = inputbox.value.trim();
    if (inputtask === "") return;
    const newadd = {
      id: Date.now(),
      text: inputtask,
      done: false,
    };
    todo.push(newadd);
    console.log(todo);
    savetask();
    rendertodolist(newadd);

    inputbox.value = "";
  });
  function savetask() {
    localStorage.setItem("todo", JSON.stringify(todo));
  }
  function rendertodolist(task) {
    const li = document.createElement("li");
    li.setAttribute("dtaid", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      savetask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      todo = todo.filter((t) => t.id !== task.id);
      li.remove();
      savetask();
    });
    list.appendChild(li);
  }
});
