import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './App.css';

function App() {
  let navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({
        "username": username, "password": password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((id) => {
        console.log(id,typeof id);
        if (id !== -1) {
          navigate('/salary', { state: { e_id: id } });
        }else{
          alert("Incorrect username or password");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className='container'>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
