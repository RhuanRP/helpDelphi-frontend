import "./styles.css";
import logo from "./../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { Icons } from "../Icons";

function Header() {
  const { signOut, user: authUser } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <img className="logo-header" src={logo} alt="Logo" />
      </div>
      <div className="header-right">
        <div className="user-info">
          <Icons.user width={40} height={40} />
          <span>{authUser?.username}</span>
        </div>
        <button onClick={signOut} className="logout-button">
          <Icons.signOut />
        </button>
      </div>
    </header>
  );
}

export default Header;
