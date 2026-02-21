import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { listTrainingsApi } from "../api/training.api";
import { updateAthleteTrainingApi } from "../api/athleteTraining.api";

const TrainingEvaluationPage = () => {
  const { id } = useParams(); 
  const [training, setTraining] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const trainings = await listTrainingsApi();
        const t = trainings.find(tr => tr.id === parseInt(id));
        setTraining(t);
      } catch (err) {
        console.error("Training fetch error:", err);
      }
    };
    fetchData();
  }, [id]);

  
  const handleChange = (athleteId, field, value) => {
    setTraining(prev => ({
      ...prev,
      Athletes: prev.Athletes.map(a =>
        a.id === athleteId
          ? { ...a, AthleteTraining: { ...a.AthleteTraining, [field]: value } }
          : a
      )
    }));
  };

  
  const handleSave = async (athlete) => {
    try {
      const at = athlete.AthleteTraining;
      await updateAthleteTrainingApi(at.id, {
        attendance: at.attendance,
        performanceScore: at.performanceScore,
        coachNotes: at.coachNotes
      });
      alert(`${athlete.User?.name} saved successfully!`);
    } catch (err) {
      console.error("Save error:", err);
      alert("Error while saving");
    }
  };

  if (!training) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>{training.name} Evaluation</h2>
      <p>
        Date: <b>{new Date(training.date).toLocaleDateString()}</b>
      </p>
      <button onClick={() => navigate("/coach/trainings")}>Back to Trainings</button>

      <div style={{ marginTop: 20 }}>
        {training.Athletes?.map(a => (
          <div key={a.id} style={{ border: "1px solid #ddd", margin: 10, padding: 10, borderRadius: 6 }}>
            <b>{a.User?.name}</b>

            <div style={{ marginTop: 5 }}>
              <label>
                Attendance:{" "}
                <select
                  value={a.AthleteTraining?.attendance || "Pending"}
                  onChange={e => handleChange(a.id, "attendance", e.target.value)}
                >
                  <option>Pending</option>
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Excused</option>
                </select>
              </label>
            </div>

            <div style={{ marginTop: 5 }}>
              <label>
                Performance Score:{" "}
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={a.AthleteTraining?.performanceScore || ""}
                  onChange={e => handleChange(a.id, "performanceScore", e.target.value)}
                />
              </label>
            </div>

            <div style={{ marginTop: 5 }}>
              <label>
                Coach Notes:{" "}
                <input
                  type="text"
                  value={a.AthleteTraining?.coachNotes || ""}
                  onChange={e => handleChange(a.id, "coachNotes", e.target.value)}
                />
              </label>
            </div>

            <button
              style={{ marginTop: 10, backgroundColor: "green", color: "white", padding: 5, borderRadius: 4 }}
              onClick={() => handleSave(a)}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingEvaluationPage;