import {UserDetails} from "../../model/UserDetails";
import '../../styling/WelcomePage.css'
import {Link} from "react-router-dom";

export type WelcomePageProps = {
    loggedInUserDetails: UserDetails | undefined;
}

export default function WelcomePage(props: WelcomePageProps) {

    return (
        <>
            <p className={"welcome-message-line1"}>Willkommen zurück, {props.loggedInUserDetails?.username}!</p>
            <p className={"welcome-message-line2"}>Sie sind eingeloggt als "{props.loggedInUserDetails?.kpiOwner}" in
                der
                Rolle "{props.loggedInUserDetails?.technicalRole}"</p>
            <Link to={"/my-kpi"} className={"link-to-my-kpi"}>Hier</Link>geht es zum persönlichen Bereich <br/>
            <Link to={"/kpi-board"} className={"link-to-kpi-board"}>Hier</Link>geht es zum Kennzahlenboard
            <img src={"pictures/welcome-guy.png"} className={"welcome-picture"} alt={""} height={500}/>
        </>
    )
}
