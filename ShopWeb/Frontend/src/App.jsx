import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css'
import { Center, Container, Stack } from '@mantine/core'
import Shop from './pages/Shop';
function App() {
  return (<div className="body">
        <Stack>
          <div className='nav'><Navbar/></div>
          <Routes><Route path='/' element={<Home/>}/><Route path='/shop' element={<Shop/>}/></Routes>
        </Stack>
        </div>)
}

export default App
