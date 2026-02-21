import { useEffect, useState } from "react";
import { listCoachesApi, registerCoachApi, editCoachApi, deleteCoachApi } from "../api/coach.api";
import { useNavigate } from "react-router-dom";

export default function CoachManagement() {
    const [coaches, setCoaches] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({name: "", email: "", specialization: "", danLevel: "", password: ""});
    const navigate = useNavigate();

    const listCoaches = async () => {

        try {
            const response = await listCoachesApi();
           
            setCoaches(response); 
        } catch (error) {
            console.error("Loading error:", error);
        }
    };

    const registerCoach = async (e) => {
        e.preventDefault();
        try {
            await registerCoachApi(formData);

            setFormData({name: "", email: "", specialization: "", danLevel: "", password: ""});
            listCoaches() 

        } catch (error) {
            console.error("Loading error:", error);
        }

    };

    const editCoach = async (e) => {
        e.preventDefault()
        try {
                
            await editCoachApi(editId, formData); 
            setFormData({name: "", email: "", specialization: "", danLevel: "", password: ""}); 
            setEditId(null);
            listCoaches();

        } catch (error) {
            console.error("Loading error:", error);
        }
    }

    const startEdit = (coach) => {
        setEditId(coach.id);
        setFormData({
            name: coach.User?.name || "",
            email: coach.User?.email || "",
            specialization: coach.specialization || "",
            danLevel: coach.danLevel || "",
            password: "" 
        });
    };

    const deleteCoach = async (coachId) => {
        try {
            await deleteCoachApi(coachId);
            listCoaches();
        } catch (error) {
            console.error("Loading error:", error);
        }
    };

    useEffect(() => {
        listCoaches();
    }, []);

    return (
        <div style={containerStyle}>
            <button onClick={() => navigate("/admin")}>← Return to panel</button>
            <h2>Coaches</h2>

            <form onSubmit={editId? editCoach : registerCoach}>
                <input type="text" value={formData.name} placeholder="Name" onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
                <input type="email" value={formData.email} placeholder="Email" onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                <input type="text" value={formData.specialization} placeholder="Specialization" onChange={(e)=>setFormData({...formData, specialization:e.target.value})}/>
                <input type="text" value={formData.danLevel} placeholder="Dan Level" onChange={(e)=>setFormData({...formData,danLevel: e.target.value})}/>
                
                <input type="password" value={formData.password} 
                placeholder={editId ? "New Password (Leave blank if you don't want to change it)" : "Password (Required)"} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">{editId ? "Update" : "Register"}</button>
            </form>

            <h3>Total Coaches ({coaches.length || 0})</h3>
            <table border="1" style={{ width: "100%", textAlign: "left", marginTop: "10px" }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialization</th>
                        <th>Dan Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {coaches.map((coach) => (
                        <tr key={coach.id}>
                            <td>{coach.User?.name}</td>
                            <td>{coach.User?.email}</td>
                            <td>{coach.specialization}</td>
                            <td>{coach.danLevel}</td>
                            <td>
                                <button onClick={() => startEdit(coach)}>Edit</button>
                                <button onClick={() => deleteCoach(coach.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
const containerStyle = {position:"fixed", top:0, maxWidth: 1200, margin: "0 auto", padding: 20 };