import './App.css';
import CalcProvider from './context/CalcContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CalcPage from './pages/calcPage';
import HistoryPage from './pages/historyPage';

function App () {
  return (
    <CalcProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CalcPage />} />
          <Route exact path={'/history'} element={<HistoryPage />} />
        </Routes>
      </Router>
    </CalcProvider>
  );
}

export default App;
