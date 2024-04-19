import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Make sure this import points to where your Modal.js is
import './Kanban.css'; // Make sure to create a CSS file for basic styling

const KanbanBoard = () => {
  const [board, setBoard] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility


  const fetchDepartments = async () => {
    setIsLoading(true); // Set loading state
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
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };


  useEffect(() => {

    fetchDepartments();
  }, []);

  const handleAddQueryClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitQuery = async (queryText) => {
    setIsModalOpen(false);
    try {
      const response = await axios.post('http://localhost:4000/api/query/createQuery', {
        queryText
      });
      // After successfully creating the query, re-fetch the updated board data
      await fetchDepartments(); // You can call this function directly to refresh the board
    } catch (error) {
      console.error('Failed to add query:', error);
      setError(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  if (!board.length) {
    return <div>No data found. Click "Add Query" to create a new query.</div>;
  }


  //Creation of a Department (unused but here if needed)
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

  //Deletion of a Department (unused but here if needed)
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
    <>
    
      <div className="kanban-header">
        <button onClick={handleAddQueryClick}>Add Query</button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitQuery} />
      <div className="title">
        Query Board
      </div>
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
    </>
  );  
};

export default KanbanBoard;
