import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const initialItems = [
  { id: 1, description: "Fill the time sheet", completed: false },
  { id: 2, description: "Creat CL for 2 diffrent locales", completed: false },
  {
    id: 3,
    description: "Create CR for t&c ticket",
    completed: false,
  },
  {
    id: 4,
    description: "Need to create 50 react projects",
    quantity: 12,
    completed: false,
  },
  {
    id: 5,
    description: "Create a doc file for JS Interview",
    completed: false,
  },
];

const App = () => {
  const [todo, setTodo] = useState(() => {
    const localData = localStorage.getItem("todo");
    return localData ? JSON.parse(localData) : initialItems;
  });
  const [sortBy, setSortBy] = useState("all");

  const handleAddTodo = (todo) => {
    setTodo((todos) => [...todos, todo]);
  };

  const handleDeleteTodo = (id) => {
    setTodo((todo) => todo.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id) => {
    setTodo((todo) =>
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="flex justify-center mt-5 h-[90vh] relative">
      <div className="p-5 bg-[#074083] lg:w-[32%] md:w-[32%] sm:w-[60%] w-[95%] h-full rounded-md overflow-auto relative">
        <h2 className="text-2xl text-center mb-7 text-slate-50">
          Create your Todo
        </h2>
        <Form onAddTodo={handleAddTodo} />
        <ListItem
          todo={todo}
          onDeleteTodo={handleDeleteTodo}
          onUpdateTodo={handleUpdateTodo}
          sortBy={sortBy}
        />
        <TodoFilter sortBy={sortBy} setSortBy={setSortBy} />
      </div>
    </div>
  );
};

const Form = ({ onAddTodo }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { id: Date.now(), description };
    onAddTodo(newItem);
    setDescription("");

    console.log(newItem);
  };

  return (
    <div className="mt-2">
      <form
        className="flex justify-between md:flex-col lg:flex-row md:gap-2 lg:gap-0"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter your todo..."
          className="px-4 py-2 rounded-md outline-slate-300 lg:w-[75%] md:w-[100%] sm:w-[80%] w-[70%]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="px-4 py-2 rounded-md bg-[#0075ff] text-slate-200">
          Add Todo
        </button>
      </form>
    </div>
  );
};

const ListItem = ({ todo, onDeleteTodo, onUpdateTodo, sortBy }) => {
  let sortedTodo;

  if (sortBy === "all") sortedTodo = todo;

  if (sortBy === "completed")
    sortedTodo = todo.filter((todo) => todo.completed);

  if (sortBy === "uncompleted")
    sortedTodo = todo.filter((todo) => !todo.completed);
  return (
    <div className=" mt-8">
      {/* <div> */}
      <div>
        {sortedTodo.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
        <TodoFilter />
      </div>
      {/* </div> */}
    </div>
  );
};

const Item = ({ item, onDeleteTodo, onUpdateTodo }) => {
  return (
    <div className="flex justify-between border-b-[1px] border-slate-500 px-3 py-1 mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="mr-5 w-4 h-4 inline-block"
          value={item.completed}
          onChange={() => onUpdateTodo(item.id)}
        />
        <p
          className={`text-[18px] font-light text-slate-100 ${
            item.completed ? "line-through" : {}
          }`}
        >
          {item.description}
        </p>
      </div>
      <MdDelete
        className="text-2xl cursor-pointer text-slate-100"
        onClick={() => onDeleteTodo(item.id)}
      />
    </div>
  );
};

const TodoFilter = ({ sortBy, setSortBy }) => {
  // const [sortBy, setSortBy] = useState("all");
  return (
    <div className="fixed bottom-[80px] md:left-[45%] sm:left-[40%] left-[31%]">
      <select
        className="px-4 py-2 rounded"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
    </div>
  );
};

export default App;
