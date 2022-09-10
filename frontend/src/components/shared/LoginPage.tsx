import {FormControl, TextField} from "@mui/material";
import {useState} from "react";
import '../../styling/LoginPage.css'


type LoginPageProps = {
    login: (username: string, password: string) => void;
}

export default function LoginPage(props: LoginPageProps) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        props.login(username, password)
        setUsername("")
        setPassword("")
    }

    return (
        <div className={"login-page"}>
            <form className={"login-form"} onSubmit={handleLogin}>
                <FormControl id="login-input">
                    <TextField id="login-username-input" label="Benutzername" variant="outlined" value={username}
                               onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl id="login-input">
                    <TextField id="login-password-input" label="Passwort" type="password" variant="outlined"
                               autoComplete={"off"}
                               value={password}
                               onChange={event => setPassword(event.target.value)}/>
                </FormControl>
                <button onSubmit={handleLogin}>Login</button>
            </form>
        </div>
    )
}
