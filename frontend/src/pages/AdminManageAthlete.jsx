import {useEffect, useState} from "react";
import {listAthletesApi, registerAthleteApi, editAthleteApi, deleteAthleteApi} from "../api/athlete.api";
import {listCoachesApi} from "../api/coach.api";
import {useNavigate} from "react-router-dom";

export default function AthleteManagement() {
    const [athletes, setAthletes] = useState([]);
    const [coaches, setCoaches] = useState([]); 
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({name: "", email: "", weight: "", belt: "", club: "", licenseNumber: "", password: "", coachId: ""});
    const navigate = useNavigate();

    const listAthletes = async () => {
        try {
            const athletes = await listAthletesApi();
            setAthletes(athletes);
        } catch (error) {
            console.error("Loading error:", error);
        }
    };

 
    const loadCoaches = async () => {
        try {
            const data = await listCoachesApi();
            setCoaches(data);
        } catch (error) {
            console.error("Coach loading error:", error);
        }
    };

    useEffect(() => {
        listAthletes();
        loadCoaches();
    }, []);

    const registerAthlete = async (e) => {
        e.preventDefault();
        try {
            await registerAthleteApi(formData);
            setFormData({name: "", email: "", weight: "", belt: "", club: "", licenseNumber: "", password: "", coachId: ""});
            listAthletes();
        } catch (error) {
            console.error("Loading error:", error);
        }
    };

    const editAthlete = async (e) => {
        e.preventDefault();
        try {
            await editAthleteApi(editId, formData);

            setEditId(null);
            setFormData({name: "", email: "", weight: "", belt: "", club: "", licenseNumber: "", password: "", coachId: ""});
            listAthletes();

        } catch (error) {
            console.error("Loading error:", error);
        }
    };

    const startEdit = (athlete) => {
        setEditId(athlete.id);
        setFormData({
            name: athlete.User?.name || "",
            email: athlete.User?.email || "",
            weight: athlete.weight || "",
            belt: athlete.belt || "",
            club: athlete.club || "",
            licenseNumber: athlete.licenseNumber || "",
            password: "", 
            coach: athlete.coachId || ""
        });
    }
    const deleteAthlete = async (athleteId) => {
        try {
            await deleteAthleteApi(athleteId);
            listAthletes();
        } catch (error) {
            console.error("Loading error:", error);
        }
    };

    return (
        <div style={containerStyle}>
            <button onClick={() => navigate("/admin")}>← Return to panel</button>
            <h2>Athletes</h2>
            
            <form onSubmit={editId ? editAthlete : registerAthlete}>
                <input type="text" placeholder="Name" value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="email" placeholder="Email" value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="text" placeholder="Weight" value={formData.weight || ""}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
                <input
                    type="text" placeholder="Belt" value={formData.belt || ""}
                    onChange={(e) => setFormData({ ...formData, belt: e.target.value })}
                />
                <input
                    type="text" placeholder="Club" value={formData.club || ""}
                    onChange={(e) => setFormData({ ...formData, club: e.target.value })}
                />
                <input
                    type="text" placeholder="License Number" value={formData.licenseNumber || ""}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                />
                <select 
                    value={formData.coachId || ""} 
                    onChange={(e) => setFormData({ ...formData, coachId: e.target.value })}
                >
                    <option value="">Select Coach (Optional)</option>
                    {coaches.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.User?.name}
                        </option>
                    ))}
                </select>

                <input type="password" value={formData.password || ""} 
                placeholder={editId ? "New Password (Leave blank if you don't want to change it)" : "Password (Required)"} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                
                <button type="submit">{editId ? "Update" : "Register"}</button>
            </form>
            <h3>Total Athletes ({athletes.length || 0})</h3>
            <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Weight</th>
                        <th>Belt</th>
                        <th>Club</th>
                        <th>License Number</th>
                        <th>Coach</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {athletes.map((athlete) => (
                        <tr key={athlete.id}>
                            <td>{athlete.User?.name}</td>
                            <td>{athlete.User?.email}</td>
                            <td>{athlete.weight}</td>
                            <td>{athlete.belt}</td>
                            <td>{athlete.club}</td>
                            <td>{athlete.licenseNumber}</td>
                            <td>{athlete.Coach?.User?.name || "No Coach"}</td>
                            <td>
                                <button onClick={() => startEdit(athlete)}>Edit</button>
                                <button onClick={() => deleteAthlete(athlete.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const containerStyle = {position:"fixed", top:0, maxWidth: 1200, margin: "0 auto", padding: 20 };