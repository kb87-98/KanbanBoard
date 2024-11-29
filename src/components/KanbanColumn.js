import React from "react";
import "../css/KanbanColumn.css";

const KanbanColumn = ({ title, cards, userMap }) => {
  return (
    <div className="kanban-column">
      <h2>{title}</h2>
      <div className="kanban-cards">
        {cards.map((card) => {
          const user = userMap[card.userId];
          return (
            <div className="kanban-card" key={card.id}>
              <h3>{card.title}</h3>
              <p>Priority: {card.priority}</p>
              <p>Tags: {card.tag.join(", ")}</p>
              {user && (
                <>
                  <p>Assigned to: {user.name}</p>
                  <p>Status: {user.available ? "Available" : "Unavailable"}</p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanColumn;
