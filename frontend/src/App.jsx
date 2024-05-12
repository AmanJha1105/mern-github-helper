import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-red-500 bg-blue-400 p-2'>Hello from home page</div>
    </>
  )
}

export default App
