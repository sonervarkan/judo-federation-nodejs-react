import { useEffect, useState } from "react";
import { getCoachProfile } from "../api/coach.api";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";


const CoachPage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const CoachProfile = async () => {
    try {
      const profileRes = await getCoachProfile();
      setProfile(profileRes);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    CoachProfile();
  }, []);

  if (!profile) return <div style={{ padding: 40 }}>Profil is loading...</div>;

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <div style={navStyle}>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={() => navigate("/coach")}>Dashboard</button>
          <button onClick={() => navigate("/coach/trainings")}>Training</button>
          <button onClick={() => navigate(`/coach/tournaments`)}>Tournament List</button>
        </div>
        <Logout />
      </div>

      <div style={layoutGrid}>
        {/* LEFT */}
        <div>
          <section style={cardStyle}>
            <h3>Coach Info</h3>
            <p><b>Name:</b> {profile.User?.name}</p>
            <p><b>Specialization:</b> {profile.specialization}</p>
            <p><b>Dan:</b> {profile.danLevel}</p>
          </section>

          <section style={cardStyle}>
            <h3>My Athletes</h3>
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>License Number</th>
                </tr>
              </thead>
              <tbody>
                {profile.Athletes?.map(a => (
                  <tr key={a.id}>
                    <td>{a.User?.name}</td>
                    <td>{a.User?.email}</td>
                    <td>{a.licenseNumber}</td>
                    <td><button onClick={() => navigate(`/coach/athlete/${a.id}`)}>Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* RIGHT */}
        <div>
          <section style={cardStyle}>
            <h3>Welcome 👋</h3>
            <p>You can manage your workouts by going to the Trainings section in the left-hand menu.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

const containerStyle = { maxWidth: 1200, margin: "auto", padding: 20, position: "absolute", top:"0", left:"10%"  };
const navStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid #ddd", paddingBottom: 10 };
const layoutGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 };
const cardStyle = { border: "1px solid #ddd", padding: 15, borderRadius: 6, marginBottom: 15 };

export default CoachPage;