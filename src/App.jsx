import './App.css'
import Lista from './components/list/Lista';
import Details from './components/new/Details';
import Footer from './components/shared/Footer';
import Header from './components/shared/Header';
import Principal from './components/shared/Principal';

function App() {

  return (
    <>
      <Header />
      <Principal>
        {/* <Lista/> */}
        <Details/>
      </Principal>
      <Footer/>
    </>
  )
}

export default App
