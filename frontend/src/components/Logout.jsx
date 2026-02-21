import { logout } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      style={{ background: "red", color: "white", padding: 8 }}
    >
      Logout
    </button>
  );
};

export default Logout;