import React, { useState, useEffect } from 'react';
import axios from 'axios';


const KanbanBoard = () => {
  const [board, setBoard] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/department/departments');
        console.log('Data fetched:', response.data); // Check the fetched data
        const departments = response.data.map(dept => ({
          ...dept,
          tasks: dept.supportQueries.map(query => ({ id: query._id, title: query.queryText }))
        }));
        setBoard(departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setError(error);
      }
    };

    fetchDepartments();
  }, []);

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!board.length) {
    return <div>Loading...</div>;
  }


  //Creation of a Department
  const handleCreateDepartment = async (departmentName) => {
    try {
      const response = await axios.post('http://localhost:4000/api/department/createDepartment', {
        name: departmentName
      });
      if (response.data) {
        setBoard([...board, response.data]); // Assuming the backend returns the created department
      }
    } catch (error) {
      console.error('Failed to create department:', error);
      setError(error);
    }
  };

  //Deletion of a Department
  const handleDeleteDepartment = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:4000/api/department/departments/${departmentId}`);
      setBoard(board.filter(dept => dept._id !== departmentId)); // Remove the department from the state
    } catch (error) {
      console.error('Failed to delete department:', error);
      setError(error);
    }
  };
  
  



  return (
    <div className="kanban-board">
      {board.map(department => (
        <div key={department._id} className="kanban-column">
          <h2>{department.name}</h2>
          {department.tasks.map(task => (
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
