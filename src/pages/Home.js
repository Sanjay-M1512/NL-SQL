import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaBars, FaUserCircle } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [username, setUsername] = useState("Loading...");
  const [databaseName, setDatabaseName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          console.error("No email found in storage");
          setUsername("Guest");
          return;
        }

        const response = await axios.get(`https://nl-sql-flask.onrender.com/user?email=${email}`);
        if (response.status === 200 && response.data.user) {
          setUsername(response.data.user.username);
        } else {
          setUsername("Unknown User");
        }

        const dbResponse = await axios.get(`https://nl-sql-flask.onrender.com/get_databases?email=${email}`);
        const databases = dbResponse.data.databases || [];
        setDatabaseName(databases.length > 0 ? databases[0] : "No Database Found");
      } catch (error) {
        console.error("Error fetching user or databases:", error);
        setUsername("Error fetching user");
      }
    };

    fetchUserData();
  }, []);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setChats((prev) => [...prev, { user: "You", message: prompt }]);

    try {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        setChats((prevChats) => [
          ...prevChats,
          { user: "Bot", message: "Error: No user email found. Please log in." },
        ]);
        return;
      }

      if (!databaseName || databaseName === "No Database Found") {
        setChats((prevChats) => [
          ...prevChats,
          { user: "Bot", message: "Error: No database found for this user." },
        ]);
        return;
      }

      const response = await axios.post("https://nl-sql-flask.onrender.com/execute_query", {
        email,
        database_name: databaseName,
        query: prompt,
      });

      if (response.data.success) {
        const { sql_query, result } = response.data;

        setChats((prevChats) => [
          ...prevChats,
          { user: "Bot", message: `SQL: ${sql_query}` },
          { user: "Bot", message: `Result: ${typeof result === "string" ? result : JSON.stringify(result, null, 2)}` },
        ]);
      } else {
        setChats((prevChats) => [
          ...prevChats,
          { user: "Bot", message: "Error: " + response.data.error },
        ]);
      }
    } catch (error) {
      setChats((prevChats) => [
        ...prevChats,
        { user: "Bot", message: "Server Error" },
      ]);
    }

    setPrompt("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
        <Sidebar chats={chats} />
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h2>Query Converter</h2>

          <div className="profile-container">
            <FaUserCircle className="profile-icon" onClick={() => setProfileMenuOpen(!profileMenuOpen)} />
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <p>{username}</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>

        <div className="chat-box">
          {chats.map((chat, index) => (
            <div key={index} className="chat-message">
              <strong>{chat.user}:</strong> <pre>{chat.message}</pre>
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask your question or write a SQL query..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
