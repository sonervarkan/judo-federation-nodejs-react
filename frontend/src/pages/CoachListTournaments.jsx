import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {listTournamentApi} from "../api/tournament.api";
import Logout from "../components/Logout";


export default function CoachListTournament(){

    const navigate = useNavigate();
    const [tournaments, setTournaments] = useState([]);

    const loadTournaments = async () => {
        const data = await listTournamentApi();
        setTournaments(data);
    };

    useEffect(() => {
        loadTournaments();
    }, []);

    return(
        <div style={containerStyle}>
            <section style={{margin:20, display:"flex", justifyContent:"space-between"}}>
                <button onClick={() => navigate("/coach")}>← Return to panel</button>
                <Logout/>
            </section>
            <h1 style={{margin:20}}>Tournament List</h1>
            <table style={cardStyle}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
                </thead>
                <tbody>
                {tournaments.map((t) => (
                    <tr key={t.id}>
                        <td>{t.name}</td>
                        <td>{t.location}</td>
                        <td>{new Date(t.startDate).toLocaleDateString("tr-TR")}</td>
                        <td>{new Date(t.endDate).toLocaleDateString("tr-TR")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const containerStyle = { maxWidth: 1200, margin: "0 auto", padding: 20, position: "absolute", top:"0", left:"30%" };
const cardStyle = { border: "1px solid #ddd", padding: 15, borderRadius: 6, marginBottom: 15 };