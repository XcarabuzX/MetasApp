import { Outlet } from 'react-router-dom';
import './App.css'
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import Principal from './components/shared/Principal';
import { useContext, useEffect } from 'react';
import { Contexto } from './services/Memory';
import { requestMetas } from './services/Requests';

function App() {
  const [ ,enviar ] = useContext(Contexto);
  useEffect(()=>{
    async function fetchData(){
        const metas = await requestMetas();
        enviar({ tipo:'colocar', metas });
    }
    fetchData();
},[enviar]);

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
