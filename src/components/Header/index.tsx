import "./styles.css";
import logo from "./../../assets/logo.png";
import user from "./../../assets/user.png";

interface HeaderProps {
  username: string;
  userAvatar: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="header-right">
        <div className="user-info">
          <img src={user} alt="User Avatar" />
          <span>{username}</span>
        </div>
        <button onClick={onLogout} className="logout-button">
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
