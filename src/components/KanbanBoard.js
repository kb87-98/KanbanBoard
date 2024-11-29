import React from "react";
import "../css/KanbanBoard.css";
import TicketCard from "./TicketCard";
import highPriority from "../utils/Img - High Priority.svg";
import lowPriority from "../utils/Img - Low Priority.svg";
import medPriority from "../utils/Img - Medium Priority.svg";
import urgentPriority from "../utils/SVG - Urgent Priority colour.svg";
import noPriority from "../utils/No-priority.svg";
import add from "../utils/add.svg";
import backlog from "../utils/Backlog.svg";
import cancel from "../utils/Cancelled.svg";
import progress from "../utils/in-progress.svg";
import done from "../utils/Done.svg";
import todo from "../utils/To-do.svg";

const KanbanBoard = ({ tickets, users, grouping, ordering }) => {
  // Define columns based on grouping

  const getColumns = () => {
    // console.log(tickets);

    if (grouping === "status") {
      let arr = Array.from(new Set(tickets.map((ticket) => ticket.status)));
      let newArr = [];
      arr.map((status) => {
        if (status === "Todo") status = [status, todo];
        if (status === "In progress") status = [status, progress];
        if (status === "Backlog") status = [status, backlog];
        if (status === "Cancelled") status = [status, cancel];
        if (status === "Done") status = [status, done];
        newArr.push(status);
        return newArr;
      });
      console.log(newArr);

      return newArr;
      // console.log(

      // ); // Unique status valuess
    } else if (grouping === "user") {
      return users.map((user) => [user.name, add]); // Display users' names as columns
    } else if (grouping === "priority") {
      return [
        ["Urgent", urgentPriority],
        ["High", highPriority],
        ["Medium", medPriority],
        ["Low", lowPriority],
        ["No Priority", noPriority],
      ];
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
      return tickets.filter((ticket) => ticket.status === column[0]);
    } else if (grouping === "user") {
      const user = users.find((user) => user.name === column[0]);
      return tickets.filter((ticket) => ticket.userId === user?.id);
    } else if (grouping === "priority") {
      return tickets.filter(
        (ticket) => getPriorityLabel(ticket.priority) === column[0]
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
              {column && (
                <div>
                  <img src={column[1]} alt="column" className="priority-icon" />
                  <span className="column-header">{column[0]}</span>
                </div>
              )}
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
