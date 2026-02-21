import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTrainingsApi, addTrainingApi, editTrainingApi, deleteTrainingApi } from "../api/training.api";
import { getCoachProfile } from "../api/coach.api";
import Logout from "../components/Logout";

const TrainingPage = () => {
  const [profile, setProfile] = useState(null);
  const [trainings, setTrainings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "Technical",
    date: "",
    startTime: "",
    endTime: "",
    coachNotes: "",
    athleteIds: [],
    attendance: "",
    performanceScore: null
  });
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  
  const fetchData = async () => {
    try {
      const profileRes = await getCoachProfile();
      setProfile(profileRes);

      const trainingsRes = await listTrainingsApi();
    
      const myTrainings = trainingsRes.filter(t => t.coachId === profileRes.id);
      setTrainings(myTrainings);
    } catch (err) {
      console.error(err);
      alert("Data retrieval error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await editTrainingApi(editId, { ...formData, coachId: profile.id });
      } else {
        await addTrainingApi({ ...formData, coachId: profile.id });
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      name: "",
      type: "Technical",
      date: "",
      startTime: "",
      endTime: "",
      coachNotes: "",
      athleteIds: [],
      attendance: "",
      performanceScore: null
    });
  };

  const handleEdit = (training) => {
    setEditId(training.id);
    setFormData({
      name: training.name,
      type: training.type,
      date: training.date,
      startTime: training.startTime,
      endTime: training.endTime,
      coachNotes: training.coachNotes || "",
      athleteIds: training.Athletes?.map(a => a.id) || [],
      attendance: training.attendance || "",
      performanceScore: training.performanceScore || null
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete it?")) return;
    try {
      await deleteTrainingApi(id);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Deletion error");
    }
  };

  if (!profile) return <div style={{ padding: 40 }}>Profil is loading...</div>;

  return (
    <div style={containerStyle}>
      {/* Navbar */}
      <div style={navStyle}>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={() => navigate("/coach")}>Dashboard</button>
          <button onClick={() => navigate("/coach/trainings")}>Training</button>
          <button onClick={() => navigate("/coach/tournament")}>Tournament</button>
        </div>
        <Logout />
      </div>

      <div style={layoutGrid}>
        {/* Form */}
        <section style={cardStyle}>
          <h3>{editId ? "Edit Training" : "Add Training"}</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
            <select name="type" value={formData.type} onChange={handleInputChange}>
              <option value="Technical">Technical</option>
              <option value="Randori">Randori</option>
              <option value="Conditioning">Conditioning</option>
              <option value="Competition Prep">Competition Prep</option>
            </select>
            <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} />
            <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} />
            <textarea name="coachNotes" value={formData.coachNotes} onChange={handleInputChange} placeholder="Coach Notes" />

            <select
              multiple
              value={formData.athleteIds}
              onChange={(e) => {
                const ids = Array.from(e.target.selectedOptions, o => Number(o.value));
                setFormData({ ...formData, athleteIds: ids });
              }}
              style={{ height: 120 }}
            >
              {profile.Athletes?.map(a => (
                <option key={a.id} value={a.id}>{a.User?.name}</option>
              ))}
            </select>

            <button type="submit" style={submitBtn}>{editId ? "Update" : "Add"}</button>
            {editId && <button type="button" onClick={resetForm}>Cancel</button>}
          </form>
        </section>

        {/* Training list */}
        <section style={cardStyle}>
          <h3>My Trainings</h3>
          {trainings.length === 0 && <p>No trainings yet</p>}
          {trainings.map(t => (
            <div key={t.id} style={trainingItemStyle}>
              <div>
                <b>{t.name}</b> ({t.date})<br />
                <small>{t.startTime} - {t.endTime}</small><br />
                <small>{t.coachNotes}</small>
                <div>
                  Athletes: {t.Athletes?.map(a => a.User?.name).join(", ")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => handleEdit(t)}>✏️</button>
                <button onClick={() => handleDelete(t.id)}>🗑</button>
                <button onClick={() => navigate(`/coach/trainings/${t.id}/evaluate`)}>Evaluate</button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const containerStyle = { maxWidth: 1200, margin: "auto", padding: 20, position: "absolute", top:"0", left:"20%"  };
const navStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid #ddd", paddingBottom: 10 };
const layoutGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 };
const cardStyle = { border: "1px solid #ddd", padding: 15, borderRadius: 6, marginBottom: 15 };
const formStyle = { display: "flex", flexDirection: "column", gap: 10 };
const trainingItemStyle = { display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", padding: 8 };
const submitBtn = { background: "green", color: "white", padding: 10 };

export default TrainingPage;