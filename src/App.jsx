import { useState } from 'react'
import Login from './login.jsx'
import './styles/login.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App
