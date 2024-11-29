import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Toolbar from "./components/Toolbar";
import "./App.css"; // Optional: Add an App-specific CSS file for basic layout

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    // Retrieve grouping from localStorage or default to 'status'
    return localStorage.getItem("grouping") || "status";
  });
  const [ordering, setOrdering] = useState(() => {
    // Retrieve ordering from localStorage or default to 'priority'
    return localStorage.getItem("ordering") || "priority";
  });

  // Fetch data from API
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets || []);
        setUsers(data.users || []);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Save grouping and ordering to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
  }, [ordering]);

  return (
    <div className="app-container">
      {/* <h1 className="app-title">Kanban Board</h1> */}
      {/* Toolbar component receives setGrouping and setOrdering as props */}
      <Toolbar setGrouping={setGrouping} setOrdering={setOrdering} />
      {/* Kanban Board */}
      <KanbanBoard
        tickets={tickets}
        grouping={grouping} // Pass grouping state
        ordering={ordering} // Pass ordering state
        users={users}
      />
    </div>
  );
};

export default App;
