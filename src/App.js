import {Routes, Route} from "react-router-dom"
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Landing from './pages/Landing';
import Directory from "./pages/Directory";
import Banner from './components/Banner/Banner';
import Live from "./components/Live/Live";
import GameStreams from "./components/GameStreams/GameStreams";
import SearchError from "./pages/SearchError/SearchError";
import Error from "./pages/Error/Error";


function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/directory" element={<Directory />} />
        <Route path="/live/:slug" element={<Live />} />
        <Route path="/game/:slug" element={<GameStreams />} />
        <Route path="/searchError" element={<SearchError />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Banner />  
    </div>
  );
}

export default App;
