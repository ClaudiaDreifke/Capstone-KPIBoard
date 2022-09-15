import {FormControl, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import '../../styling/LoginPage.css'
import {toast} from "react-toastify";
import {UserDetails} from "../../model/UserDetails";

type LoginPageProps = {
    login: (username: string, password: string) => void,
    loggedInUserDetails: UserDetails | undefined,
}

export default function LoginPage(props: LoginPageProps) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username === "" || password === "") {
            toast.error("Bitte Benutzernamen und Passwort eingeben")
        } else {
            props.login(username, password)
            setUsername("")
            setPassword("")
        }
    }

    return (
        <div className={"login-page"}>
            <form className={"login-form"} onSubmit={handleLogin}>
                <FormControl id="login-input">
                    <TextField id="login-username-input" label="Benutzername" variant="outlined" value={username}
                               autoComplete={"off"}
                               onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl id="login-input">
                    <TextField id="login-password-input" label="Passwort" type="password" variant="outlined"
                               autoComplete={"off"}
                               value={password}
                               onChange={event => setPassword(event.target.value)}/>
                </FormControl>
                <button type={"submit"}>Login</button>
            </form>
            <img className={"login-page-pic"} src={"pictures/background-login.png"} alt={""}/>
        </div>
    )
}
