import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";



export default function AdminDashboard() {

    const navigate = useNavigate();

    return (
        <div style={containerStyle}>
            <h2>Admin Dashboard</h2>
              {/* Navbar */}
            <div style={navStyle}>
                <div style={{ display: "flex", gap: 20 }}>
                    <button onClick={() => navigate("/admin/coach")}>Coach Management</button>
                    <button onClick={() => navigate("/admin/athlete")}>Athlete Management</button>
                    <button onClick={() => navigate("/admin/tournaments")}>Tournament Management</button>
                </div>
                <Logout />
            </div>
        </div>
    );
}
const containerStyle = {position:"fixed", top:0, maxWidth: 1200, margin: "0 auto", padding: 20 };
const navStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderBottom: "1px solid #ddd", paddingBottom: 10 };