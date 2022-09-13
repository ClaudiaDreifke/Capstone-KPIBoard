import {NavLink, useNavigate} from "react-router-dom";
import '../../styling/NavBar.css'
import LogoutIcon from '@mui/icons-material/Logout';

export type NavBarProps = {
    logout: () => void,
}

export default function NavBar(props: NavBarProps) {

    const navigate = useNavigate();

    const handleLogout = () => {
        props.logout()
        navigate("/")
    }

    return (
        <nav className={"navigation-bar"}>
            <nav className={"kpi-board-link"}>
                <NavLink className={"nav"} to={"/kpi-board"}> Kennzahlen-Board </NavLink>
            </nav>
            <nav className={"my-kpi-link"}>
                <NavLink className={"nav"} to={"/my-kpi"}> Meine Kennzahlen </NavLink>
            </nav>
            <LogoutIcon className={"logout-button"} onClick={handleLogout}>Logout</LogoutIcon>
        </nav>
    )
}
