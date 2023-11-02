import "./styles.css";
import logo from "./../../assets/logo.png";
import user from "./../../assets/user.png";
import exit from "./../../assets/exit.png";
import { useAuth } from "../../hooks/useAuth";



function Header() {
  const { signOut, user: authUser } = useAuth()

  return (
    <header className="header">
      <div className="header-left">
        <img className="logo-header" src={logo} alt="Logo" />
      </div>
      <div className="header-right">
        <div className="user-info">
          <img src={user} alt="User Avatar" />
          <span>{authUser?.username}</span>
        </div>
        <button onClick={signOut} className="logout-button">
          <img className="exit-icon" src={exit} alt="exit" />
        </button>
      </div>
    </header>
  );
}

export default Header;
