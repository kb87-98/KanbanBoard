import React from "react";
import "../css/TicketCard.css";

// Import priority icons
import UrgentIcon from "../utils/SVG - Urgent Priority colour.svg";
import HighIcon from "../utils/Img - High Priority.svg";
import MediumIcon from "../utils/Img - Medium Priority.svg";
import LowIcon from "../utils/Img - Low Priority.svg";
import NoPriorityIcon from "../utils/No-priority.svg";

const TicketCard = ({ ticket }) => {
  const {
    id = "Unknown",
    title = "Untitled",
    tag = "Feature Request",
    profileImage,
    priority,
  } = ticket;

  // Priority mapping
  const priorityIcons = {
    4: UrgentIcon,
    3: HighIcon,
    2: MediumIcon,
    1: LowIcon,
    0: NoPriorityIcon,
  };
  const priorityIcon = priorityIcons[priority] || NoPriorityIcon;

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h5 className="ticket-id">{id}</h5>
        <img src={profileImage} alt="User" className="profile-image" />
      </div>
      <h4 className="ticket-title">{title}</h4>
      <div className="ticket-details-row">
        <img src={priorityIcon} alt="Priority Icon" className="priority-icon" />
        <p className="ticket-tag">{tag}</p>
      </div>
    </div>
  );
};

export default TicketCard;
