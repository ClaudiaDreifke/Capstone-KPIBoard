import '../../styling/LogoutButton.css'
import {useNavigate} from "react-router-dom";


export type LogOutButtonProps = {
    logout: () => void,
}

export default function LogoutButton(props: LogOutButtonProps) {

    const navigate = useNavigate()

    const handleLogout = () => {
        props.logout()
        navigate("/")
    }

    return (
        <>
            <button className={"logout-button"} onClick={handleLogout}>Logout</button>
        </>
    )
}