import React, { useState } from "react";
import { FaBars, FaTimes, FaCommentAlt } from "react-icons/fa";
import "./Sidebar.css"; // Import CSS for styling

const Sidebar = ({ chats }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <>
          <h3 className="sidebar-title">Chat History</h3>
          <ul className="chat-list">
            {chats.map((chat, index) => (
              <li key={index} className="chat-item">
                <FaCommentAlt className="chat-icon" /> {chat.message}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
