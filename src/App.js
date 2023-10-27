import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import Banner from './components/Banner/Banner';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Games />
      <Banner />
    </div>
  );
}

export default App;
