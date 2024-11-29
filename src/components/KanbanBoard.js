import React from "react";
import "../css/KanbanBoard.css";
import TicketCard from "./TicketCard";

const KanbanBoard = ({ tickets, users, grouping, ordering }) => {
  // Define columns based on grouping
  const getColumns = () => {
    if (grouping === "status") {
      return Array.from(new Set(tickets.map((ticket) => ticket.status))); // Unique status values
    } else if (grouping === "user") {
      return users.map((user) => user.name); // Display users' names as columns
    } else if (grouping === "priority") {
      return ["Urgent", "High", "Medium", "Low", "No Priority"];
    }
    return [];
  };

  // Map priority numbers to labels
  const getPriorityLabel = (priority) => {
    const priorityMap = {
      4: "Urgent",
      3: "High",
      2: "Medium",
      1: "Low",
      0: "No Priority",
    };
    return priorityMap[priority] || "No Priority";
  };

  // Filter tickets into respective columns
  const filterTicketsByColumn = (column) => {
    if (grouping === "status") {
      return tickets.filter((ticket) => ticket.status === column);
    } else if (grouping === "user") {
      const user = users.find((user) => user.name === column);
      return tickets.filter((ticket) => ticket.userId === user?.id);
    } else if (grouping === "priority") {
      return tickets.filter(
        (ticket) => getPriorityLabel(ticket.priority) === column
      );
    }
    return [];
  };

  // Sort tickets within columns based on the ordering state
  const sortTickets = (ticketArray) => {
    if (ordering === "priority") {
      return ticketArray.sort((a, b) => b.priority - a.priority); // Sort by priority
    } else if (ordering === "title") {
      return ticketArray.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
    }
    return ticketArray;
  };

  const columns = getColumns();

  return (
    <div className="kanban-board">
      <div className="kanban-columns">
        {columns.map((column, index) => {
          const ticketsInColumn = sortTickets(filterTicketsByColumn(column));
          return (
            <div className="kanban-column" key={index}>
              {column && <h3 className="column-header">{column}</h3>}
              <div className="column-tickets">
                {ticketsInColumn.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
