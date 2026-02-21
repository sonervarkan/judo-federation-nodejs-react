import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
// Admin Routes
import AdminDashboard from "./pages/AdminDashboard";
import CoachManagement from "./pages/AdminManageCoach";
import AthleteManagement from "./pages/AdminManageAthlete";
import TournamentManagement from "./pages/AdminManageTournament";

// Coach Routes
import CoachPage from "./pages/CoachPage";
import TrainingPage from "./pages/TrainingCrud";
import TrainingEvaluationPage from "./pages/TrainingEvaluation";
import CoachMyAthlete from "./pages/CoachMyAthlete";
import CoachListTournament from "./pages/CoachListTournaments";

import AthletePage from "./pages/AthletePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Entrance */}
        <Route path="/" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/coach" element={<CoachManagement />} />
        <Route path="/admin/athlete" element={<AthleteManagement />} />
        <Route path="/admin/tournaments" element={<TournamentManagement />} />

        {/* Coach Routes */}
        <Route path="/coach" element={<CoachPage />} /> 
        <Route path="/coach/trainings" element={<TrainingPage />} /> 
        <Route path="/coach/trainings/:id/evaluate" element={<TrainingEvaluationPage />} /> 
        <Route path="/coach/athlete/:id" element={<CoachMyAthlete />} />
        <Route path="/coach/tournaments" element={<CoachListTournament />} />

        {/* Athlete */}
        <Route path="/athlete" element={<AthletePage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;