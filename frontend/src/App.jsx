import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './assets/newui/Navbar'
import Search from './assets/newui/Search'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div>
        <Search />
      </div>
    </>
  )
}

export default App
