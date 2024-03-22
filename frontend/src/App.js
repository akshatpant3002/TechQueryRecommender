import logo from './logo.svg';
import './App.css';
import KanbanBoard from './Kanban';

function App() {
  return (
    <div className="container"> {/* This div acts as the flex container */}
      <KanbanBoard />
    </div>
  );
}

export default App;
