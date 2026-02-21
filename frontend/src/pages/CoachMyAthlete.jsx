import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { myAthleteApi } from "../api/myAthlete.api";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

export default function CoachMyAthlete() {
  const navigate = useNavigate();
  const {id}=useParams();
  const [athlete, setAthlete] = useState(null);
 

  useEffect(() => {
    const fetchAthlete = async () => {
      const data = await myAthleteApi(id);
      setAthlete(data);
    };

    fetchAthlete();
  }, [id]);

  if (!athlete) return <div>Loading...</div>;

  return (
    <div style={containerStyle}>
      <h2>My Athlete</h2>
        {/* Navbar */}
      <div style={navStyle}>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={() => navigate("/coach")}>Dashboard</button>
          <button onClick={() => navigate("/coach/trainings")}>Training</button>
          <button onClick={() => navigate("/coach/tournament")}>Tournament</button>
        </div>
        <Logout />
      </div>

      <p><b>Name:</b> {athlete.User?.name}</p>
      <p><b>Email:</b> {athlete.User?.email}</p>
      <p><b>Weight:</b> {athlete.weight}</p>
      <p><b>Belt:</b> {athlete.belt}</p>
      <p><b>Club:</b> {athlete.club}</p>
      <p><b>License:</b> {athlete.licenseNumber}</p>

      <hr />

      <h3>Trainings</h3>

      {athlete.Trainings?.map(t => (
        <div key={t.id} style={{ border: "1px solid #ddd", marginBottom: 10, padding: 10 }}>
          <p><b>Name:</b> {t.name}</p>
          <p><b>Date:</b> {t.date}</p>

          <p><b>Attendance:</b> {t.AthleteTraining?.attendance}</p>
          <p><b>Performance:</b> {t.AthleteTraining?.performanceScore}</p>
          <p><b>Coach Notes:</b> {t.AthleteTraining?.coachNotes}</p>
        </div>
      ))}

      <hr />

      <h3>Tournaments</h3>

      {athlete.Tournaments?.length === 0 && <p>No tournaments yet.</p>}

      {athlete.Tournaments?.map(t => (
        <div
          key={t.id}
          style={{ border: "1px solid #ddd", marginBottom: 10, padding: 10 }}
        >
          <p><b>Name:</b> {t.name}</p>
          <p><b>Location:</b> {t.location}</p>
          <p><b>Rank:</b> {t.AthleteTournament?.rank}</p>
          <p><b>Weight Category:</b> {t.AthleteTournament?.weightCategory}</p>
        </div>
      ))}
    </div>
  );
}
const containerStyle = { maxWidth: 1200, margin: "auto", padding: 20 };
const navStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid #ddd", paddingBottom: 10 };