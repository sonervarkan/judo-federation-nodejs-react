import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listTournamentApi, registerTournamentApi, editTournamentApi, deleteTournamentApi, addAthleteToTournamentApi,
updateAthleteRankApi } from "../api/tournament.api";

export default function TournamentManagement() {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);

  const [rank, setRank] = useState("");
  const [weightCategory, setWeightCategory] = useState("");
  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: ""
  });



  const loadTournaments = async () => {
    const data = await listTournamentApi();
    setTournaments(data);
  };

  useEffect(() => {
    loadTournaments();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    if (editId) {
      await editTournamentApi(editId, formData);
    } else {
      await registerTournamentApi(formData);
    }

    setFormData({ name: "", location: "", startDate: "", endDate: "" });
    setEditId(null);
    loadTournaments();
  };

  const startEdit = (t) => {
    setEditId(t.id);
    setFormData({
      name: t.name,
      location: t.location,
      startDate: t.startDate?.split("T")[0],
      endDate: t.endDate?.split("T")[0]
    });
  };

  const remove = async (id) => {
    if (!confirm("Should it be deleted?")) return;
    await deleteTournamentApi(id);
    loadTournaments();
  };


  const addAthleteToTournament = async () => {

    if (!email) return alert("Enter Email");

    try {

      await addAthleteToTournamentApi({
        tournamentId: selectedTournamentId,
        email,
        weightCategory,
        rank
      });

      alert("Athlete has been added to the tournament.");

      setEmail("");
      setWeightCategory("");
      setRank("");
      setSelectedTournamentId(null);

    } catch (err) {

      alert(err.response?.data?.message || "An error occurred.");

    }
  };

  const editRank = async () => {
    try {

      await updateAthleteRankApi({
        tournamentId: selectedTournamentId,
        email,
        rank
      });

      alert("Rank updated");

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div style={containerStyle}>

      <button onClick={() => navigate("/admin")}>← Return</button>

      <h2>Tournaments</h2>

      <form onSubmit={submit}>

        <input placeholder="Name" value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

        <input placeholder="Location" value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })} />

        <input type="date" value={formData.startDate || ""}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />

        <input type="date" value={formData.endDate || ""}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />

        <button>{editId ? "Update" : "Create"}</button>
      </form>

      <hr />
      <table border="1" style={{ width: "100%", marginTop: 10 }}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tournaments.map(t => (
            <tr key={t.id}>
              <td>{t.name}</td>
              <td>{t.location}</td>
              <td>{t.startDate?.split("T")[0]}</td>
              <td>{t.endDate?.split("T")[0]}</td>

              <td>
                <button onClick={() => startEdit(t)}>Edit</button>
                <button onClick={() => remove(t.id)}>Delete</button>
                <button onClick={() => {setSelectedTournamentId(t.id); setEditMode(false);}}> Add Athlete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTournamentId && (
        <>
          <h3>Add Athlete to Tournament</h3>

          <input placeholder="Athlete Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

          <input placeholder="Weight Category" value={weightCategory} onChange={(e) => setWeightCategory(e.target.value)} />

          <input placeholder="Rank" value={rank} onChange={(e) => setRank(e.target.value)} />

          <button onClick={addAthleteToTournament}>Add</button>
          <button onClick={editRank} style={{ marginLeft: 10 }}>Edit </button>
        </>
      )}

    </div>
  );
}

const containerStyle = { maxWidth: 1200, padding: 20 };