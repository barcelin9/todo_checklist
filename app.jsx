function App() {
  
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  
  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const [selectedTask, setSelectedTask] = React.useState(null);

  // Alternar tarefa concluída
  function onTaskClick(taskId) {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  }

  function onDeleteTaskClick(taskId) {
    setTasks(tasks.filter(task => task.id !== taskId));
  }


  function onAddTaskSubmit(title, description) {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title,
        description,
        isCompleted: false
      }
    ]);
  }

  if (selectedTask) {
    return (
      <TaskDetails 
        task={selectedTask} 
        onBack={() => setSelectedTask(null)} 
      />
    );
  }

  return (
    <div className="card-box">
      <h1 className="title">Gerenciador de Tarefas</h1>

      <AddTask onAddTaskSubmit={onAddTaskSubmit} />

      <Tasks
        tasks={tasks}
        onTaskClick={onTaskClick}
        onDeleteTaskClick={onDeleteTaskClick}
        onOpenDetails={(task) => setSelectedTask(task)}
      />
    </div>
  );
}


function Tasks({ tasks, onTaskClick, onDeleteTaskClick, onOpenDetails }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>

          <button className="tasks-title" onClick={() => onTaskClick(task.id)}>
            {task.isCompleted && <i class="bi bi-check-square-fill"></i>}
            <span className={task.isCompleted ? "completed" : ""}>
              
              {task.title}
            </span>
          </button>

          <button onClick={() => onOpenDetails(task)}>
            <i className="bi bi-arrow-right"></i>
          </button>

          <button onClick={() => onDeleteTaskClick(task.id)}>
            <i className="bi bi-trash-fill"></i>
          </button>

        </li>
      ))}
    </ul>
  );
}


function TaskDetails({ task, onBack }) {
  return (
    <div className="details">
      <div className="details-card">
  
        <h1>{task.title}</h1>
        <div className="line"></div>
        <p>{task.description}</p>
        
        <button onClick={onBack}>Voltar</button>
      </div>
    </div>
  );
}


function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleAdd() {
    if (!title.trim() || !description.trim()) {
      return alert("Preencha todos os campos para adicionar uma tarefa");
    }

    onAddTaskSubmit(title, description);
    setTitle("");
    setDescription("");
  }

  return (
    <div className="addTask">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
}


// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
