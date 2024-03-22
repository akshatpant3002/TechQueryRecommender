import React, { useState } from 'react';

const initialBoard = [
    { id: 1, name: "Penis", tasks: [{ id: 1, title: "Task 1" }, { id: 2, title: "Task 2" }] },
    { id: 2, name: "Penis2", tasks: [] },
    { id: 3, name: "Do Penis 3", tasks: [] },
  ];
  
const KanbanBoard = () => {
  const [board, setBoard] = useState(initialBoard);

  // Function to add a new task, move tasks, and delete tasks will go here

  return (
    <div className="kanban-board">
      {board.map(column => (
        <div key={column.id} className="kanban-column">
          <h2>{column.name}</h2>
          {column.tasks.map(task => (
            <div key={task.id} className="kanban-task">
              <p>{task.title}</p>
              {/* Buttons or links to move and delete tasks */}
            </div>
          ))}
          {/* Button or form to add new tasks */}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
