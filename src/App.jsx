import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Recovery from './pages/Recovery';
import Home from './pages/Home';
import RentCourt from './pages/RentCourt';
import Matches from './pages/Matches';
import Teams from './pages/Teams';
import Tournaments from './pages/Tournaments';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rent" element={<RentCourt />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/tournaments" element={<Tournaments />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
