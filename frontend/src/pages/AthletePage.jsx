import { useState, useEffect } from "react";
import { getAthleteProfile } from "../api/athlete.api";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth.api";

export default function AthletePage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const loadProfile = async () => {
      try {
        const data = await getAthleteProfile();
        setProfile(data);
      } catch (err) {
        console.error("Profile cannot be loaded", err);
      }
    };
  
  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) return <div style={{ padding: 40 }}>Profile is loading...</div>;


  return (
    <div style={containerStyle}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2>Athlete Dashboard</h2>
        <button onClick={() => { logout(); navigate("/login"); }} style={logoutBtn} > Logout </button>
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:"20px"}}>
        <div style={{display:"flex", gap:40}}>

          <section style={{ maxWidth: 1200, margin: "auto", padding: 20, gap:20, textAlign:"left" }}>
            <h3>Profile Info</h3>
            <p><b>Name:</b> {profile.User?.name}</p>
            <p><b>Club:</b> {profile.club}</p>
            <p><b>Weight:</b> {profile.weight}</p>
            <p><b>Belt:</b> {profile.belt}</p>
            <p><b>Coach:</b> {profile.Coach?.User?.name || "Not assigned"}</p>
          </section>

          <div style={cardStyle}>
            <h3>My Trainings</h3>
            <table >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Attendance</th>
                  <th>Performance Score</th>
                  <th>Coach Notes</th>
                </tr>
              </thead>
              <tbody>
                {profile?.Trainings?.length > 0 ? (
                  profile.Trainings.map(t => (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.type}</td>
                      <td>{t.date?.slice(0,10)}</td>
                      <td>{t.startTime?.slice(0,10)}</td>
                      <td>{t.endTime?.slice(0,10)}</td>
                      <td>{t.AthleteTraining?.attendance}</td>
                      <td style={{display:"flex", flexDirection:"column", alignItems:"center"}}>{t.AthleteTraining?.performanceScore}</td>
                      <td>{t.AthleteTraining?.coachNotes}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No Training
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div style={cardStyle}>
          <h3>My Tournaments</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              {profile.Tournaments?.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.location}</td>
                  <td>{new Date(t.startDate).toLocaleDateString("tr-TR")}</td>
                  <td>{new Date(t.endDate).toLocaleDateString("tr-TR")}</td>
                  <td>{t.AthleteTournament?.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}



const containerStyle = { maxWidth: 1200, margin: "auto", padding: 20, position: "absolute", top:"0", left:"10%"};
const cardStyle = { display: "flex", border: "1px solid #ddd", padding: 15, borderRadius: 6, flexDirection:"column", 
 textAlign:"left", top:"0"   };
const logoutBtn = { background: "red", color: "white", padding: 8, height: 40 };