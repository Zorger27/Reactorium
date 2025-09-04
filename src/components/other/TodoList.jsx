import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import "@/components/other/TodoList.scss";

export default function TodoList() {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [lastId, setLastId] = useState(0);

  // Загружаем задачи из localStorage при монтировании
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    const fixed = saved.map((task) => ({
      ...task,
      completed: task.completed || false,
    }));
    setTasks(fixed);
    setLastId(saved.reduce((maxId, task) => Math.max(maxId, task.id), 0));
  };

  const saveTasks = (updated) => {
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTasks(updated);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
      id: lastId + 1,
      name: newTask,
      editing: false,
      completed: false,
    };

    const updated = [...tasks, task];
    setLastId(task.id);
    saveTasks(updated);
    setNewTask("");
  };

  const editTask = (task) => {
    task.editing = false;
    saveTasks([...tasks]);
  };

  const deleteTask = (index) => {
    if (window.confirm(t("project3.delete-msg"))) {
      const updated = [...tasks];
      updated.splice(index, 1);
      saveTasks(updated);
    }
  };

  const deleteAllTasks = () => {
    if (window.confirm(t("project3.delete-msg"))) {
      setTasks([]);
      setLastId(0);
      localStorage.removeItem("tasks");
    }
  };

  const toggleCompleted = (task) => {
    task.completed = !task.completed;
    saveTasks([...tasks]);
  };

  return (
    <div className="todo-list">
      <div className="table">
        <table>
          <thead>
          <tr>
            <th colSpan="4">
              <form onSubmit={addTask}>
                <input type="text" value={newTask} placeholder={t("project3.add-task")}
                       onChange={(e) => setNewTask(e.target.value)}
                />
                <button className="add-task" type="submit"><i className="fas fa-plus-circle"></i></button>
              </form>
            </th>
          </tr>
          <tr>
            <th>№</th>
            <th>{t("project3.task")}</th>
            <th>
              <span className="icon"><i className="fas fa-check-circle"></i></span>
              <span className="txt">{t("project3.status")}</span>
            </th>
            <th>{t("project3.actions")}</th>
          </tr>
          </thead>
          <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td className="name">
                {task.editing ? (
                  <input type="text" value={task.name}
                         onChange={(e) => {
                           task.name = e.target.value;
                           saveTasks([...tasks]);
                         }}
                         onBlur={() => editTask(task)}
                         onKeyDown={(e) => e.key === "Enter" && editTask(task)}
                         autoFocus
                  />
                ) : (
                  <span className={task.completed ? "completed" : ""}>{task.name}</span>
                )}
              </td>
              <td>
                <button className="btn" onClick={() => toggleCompleted(task)}
                        title={task.completed ? t("project3.done") : t("project3.in-progress")}>
                  <i className={ task.completed ? "fas fa-check" : "fas fa-clock" }></i>
                </button>
              </td>
              <td className="action">
                {!task.editing && (
                  <>
                    <button className="btn norm txt"
                            onClick={() => {
                              task.editing = true;
                              saveTasks([...tasks]);
                            }}
                    >
                      {t("project3.edit")}
                    </button>
                    <button className="btn norm icon"
                            onClick={() => {task.editing = true; saveTasks([...tasks]);}} title={t("project3.edit")}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </>
                )}
                <button className="btn danger txt" onClick={() => deleteTask(index)}>
                  {t("project3.delete")}
                </button>
                <button className="btn danger icon" onClick={() => deleteTask(index)} title={t("project3.delete")}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          </tbody>
          <tfoot>
          <tr>
            <th colSpan="4">
              <button className="btn danger" onClick={deleteAllTasks}>
                {t("project3.delete-all-tasks")}
              </button>
            </th>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}