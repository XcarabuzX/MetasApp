import { Outlet } from 'react-router-dom';
import './App.css'
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import Principal from './components/shared/Principal';

function App() {

  return (
    <>
      <Header />
      <Principal>
        <Outlet />
      </Principal>
      <Footer/>
    </>
  )
}

export default App
