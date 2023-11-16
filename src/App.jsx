import './App.css'
import Meta from './components/list/Meta';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import Principal from './components/shared/Principal';

function App() {

  return (
    <>
      <Header />
      <Principal>
        <Meta />
      </Principal>
      <Footer/>
    </>
  )
}

export default App
