import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mysqlUsername, setMysqlUsername] = useState("");
  const [mysqlPassword, setMysqlPassword] = useState("");
  const [databaseName, setDatabaseName] = useState(""); // New state for database name
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://nl-sql-flask.onrender.com/register", {
        username,
        email,
        password,
        mysql_root_user: mysqlUsername,
        mysql_root_password: mysqlPassword,
        database_name: databaseName, // Include database name in the request
      });

      if (response.status === 201) {
        alert("Registration successful! Database created.");
        navigate("/login");
      } else {
        alert("Registration failed! Please try again.");
      }
    } catch (error) {
      alert("Registration failed! Email might already be in use.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="title">Join Query Converter</h1>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="MySQL Username" value={mysqlUsername} onChange={(e) => setMysqlUsername(e.target.value)} required />
          <input type="password" placeholder="MySQL Root Password" value={mysqlPassword} onChange={(e) => setMysqlPassword(e.target.value)} required />
          <input type="text" placeholder="Database Name" value={databaseName} onChange={(e) => setDatabaseName(e.target.value)} required /> {/* New input for database */}
          <button type="submit">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
