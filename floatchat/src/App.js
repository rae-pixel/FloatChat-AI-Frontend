import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Overview from './Overview';
import AiAssistant from './AiAssistant';

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
