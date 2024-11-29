import React, { useState } from "react";
import "../css/Toolbar.css"; // If needed for additional styling
import DisplayIcon from "../utils/Display.svg"; // Assuming display.svg is in the utils folder

const Toolbar = ({ setGrouping, setOrdering }) => {
  // State to manage the modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleOrderingChange = (event) => {
    setOrdering(event.target.value);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible); // Toggle modal visibility
  };

  return (
    <div className="toolbar">
      {/* Display Button with Icon */}
      <button className="display-btn" onClick={toggleModal}>
        <img src={DisplayIcon} alt="Display" className="display-icon" /> Display
      </button>

      {/* Modal for Dropdowns */}
      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <div className="grouping-dropdown">
              <label>Group By:</label>
              <select onChange={handleGroupingChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="ordering-dropdown">
              <label>Order By:</label>
              <select onChange={handleOrderingChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
