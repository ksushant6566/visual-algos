import Searching from './searchingAlgorithms/Searching'
import Sorting from './sortingAlgorithms/Sorting'
import './App.css';
import { useState , useEffect} from 'react';


function App() {

  const [operation, setOpertaion] = useState('sorting')

  useEffect(() => {
    if(operation === 'sorting') {
      document.getElementsByClassName('navbtn1')[0].style.backgroundColor = 'grey'
      document.getElementsByClassName('navbtn2')[0].style.backgroundColor = ' rgb(255, 85, 241)'
    }else {
      document.getElementsByClassName('navbtn2')[0].style.backgroundColor = 'grey'
      document.getElementsByClassName('navbtn1')[0].style.backgroundColor = ' rgb(255, 85, 241)'
    }
  }, [operation])

  return (
    <div className="App">

      <div className="navbar">
        <div onClick={() => setOpertaion('searching')} className="btn  navbtn navbtn1" >searching</div>
        <div onClick={() => setOpertaion('sorting')} className="btn  navbtn navbtn2" >sorting</div>
      </div>

      {operation === 'searching' ? <Searching /> : <Sorting />}
      
    </div>
  );
}

export default App;

