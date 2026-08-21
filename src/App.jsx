import { useState } from 'react'
import './App.css'

const listTab = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
]

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Học React hooks cơ bản', active: true },
    { id: 2, text: 'Làm bài tập todo app', active: true },
    { id: 3, text: 'Đọc xong tài liệu CSS', active: false },
    { id: 4, text: 'Deploy lên Vercel', active: false },
  ])
  const [input, setInput] = useState('')
  const [tab, setTab] = useState('all')

  const add = (e) => {
    e.preventDefault()
    if (input.trim() === '') return
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      active: true,
    }
    setTasks([...tasks, newTask])
    setInput('')
  }

  const check = (id) => {
    const newArr = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, active: !t.active }
      }
      return t
    })
    setTasks(newArr)
  }

  const remove = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const removeAllComplete = () => {
    const remain = tasks.filter((t) => t.active == true)
    setTasks(remain)
  }

  const sortedTasks = [...tasks].sort((a, b) => b.id - a.id)

  return (
    <div className="todo-page">
      <div className="todo-app">
        <h1 className="todo-title">Todo List</h1>

        <div className="todo-tabs">
          {listTab.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={'todo-tab ' + (tab === item.id ? 'is-active' : '')}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {tab !== 'completed' && (
          <form onSubmit={add} className="todo-add">
            <input
              type="text"
              placeholder="Add details"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="todo-input"
            />
            <button type="submit" className="todo-add-btn">Add</button>
          </form>
        )}

        <div className="todo-content">
          {tab === 'all' && (
            <ul className="todo-list">
              {sortedTasks.length === 0 && <li className="todo-empty">No tasks</li>}
              {sortedTasks.map((t) => (
                <li key={t.id} className="todo-item">
                  <label className="todo-check">
                    <input
                      type="checkbox"
                      checked={!t.active}
                      onChange={() => check(t.id)}
                    />
                    <span className="todo-check__box"></span>
                    <span className={'todo-text' + (t.active ? '' : ' is-done')}>
                      {t.text}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}

          {tab === 'active' && (
            <ul className="todo-list">
              {sortedTasks.filter((t) => t.active).length === 0 && (
                <li className="todo-empty">No active tasks</li>
              )}
              {sortedTasks
                .filter((t) => t.active)
                .map((t) => (
                  <li key={t.id} className="todo-item">
                    <label className="todo-check">
                      <input
                        type="checkbox"
                        checked={!t.active}
                        onChange={() => check(t.id)}
                      />
                      <span className="todo-check__box"></span>
                      <span className="todo-text">{t.text}</span>
                    </label>
                  </li>
                ))}
            </ul>
          )}

          {tab === 'completed' && (
            <>
              <ul className="todo-list">
                {sortedTasks.filter((t) => !t.active).length === 0 && (
                  <li className="todo-empty">No completed tasks</li>
                )}
                {sortedTasks
                  .filter((t) => !t.active)
                  .map((t) => (
                    <li key={t.id} className="todo-item">
                      <label className="todo-check">
                        <input
                          type="checkbox"
                          checked={!t.active}
                          onChange={() => check(t.id)}
                        />
                        <span className="todo-check__box"></span>
                        <span className="todo-text is-done">{t.text}</span>
                      </label>
                      <button
                        className="todo-delete"
                        onClick={() => remove(t.id)}
                        title="Delete"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            fill="currentColor"
                            d="M9 3v1H4v2h1l1.11 14.05A2 2 0 0 0 8.1 22h7.8a2 2 0 0 0 1.99-1.95L19 6h1V4h-5V3H9zm2 5h2v9h-2V8zm-4 0h2v9H7V8zm8 0h2v9h-2V8z"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
              </ul>
              {sortedTasks.filter((t) => !t.active).length > 0 && (
                <div className="todo-delete-all-wrap">
                  <button
                    className="todo-delete-all"
                    onClick={removeAllComplete}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14">
                      <path
                        fill="currentColor"
                        d="M9 3v1H4v2h1l1.11 14.05A2 2 0 0 0 8.1 22h7.8a2 2 0 0 0 1.99-1.95L19 6h1V4h-5V3H9zm2 5h2v9h-2V8zm-4 0h2v9H7V8zm8 0h2v9h-2V8z"
                      />
                    </svg>
                    Delete all
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App