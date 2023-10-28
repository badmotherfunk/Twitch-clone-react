import {Routes, Route} from "react-router-dom"
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Landing from './pages/Landing';
import Directory from "./pages/Directory";
import Banner from './components/Banner/Banner';
import Live from "./components/Live/Live";


function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/live/:slug" element={<Live />} />
      </Routes>
      <Banner />  
    </div>
  );
}

export default App;
