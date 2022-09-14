import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {KpiOwner} from "../../model/KpiOwner";
import {toast} from "react-toastify";
import {AppUser} from "../../model/AppUser";
import '../../styling/AddUser.css'


export type AddUserProps = {
    appUsers: AppUser[] | undefined,
    kpiOwners: KpiOwner[],
    addNewUser: (newUser: AppUser) => Promise<void>,
}

export default function AddUser(props: AddUserProps) {

    const [username, setUsername] = useState("")
    const [initialPassword, setInitialPassword] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [kpiOwner, setKpiOwner] = useState("")
    const [technicalRole, setTechnicalRole] = useState("")

    const appUser: AppUser | undefined = props.appUsers?.find((a: AppUser) => a.username === username)

    const onUserSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!username) {
            toast.error("Bitte einen Benutzernamen eingeben")
        }
        if (appUser?.username.includes(username)) {
            toast.error("Dieser Username existiert bereits, bitte geben Sie einen anderen Benutzernamen ein")
        }
        if (!initialPassword) {
            toast.error("Bitte ein Passwort eingeben")
        }
        if (!emailAddress) {
            toast.error("Bitte eine Emailadresse eingeben")
        }
        if (!kpiOwner) {
            toast.error("Bitte eine Verantwortlichkeit eingeben")
        }
        if (!technicalRole) {
            toast.error("Bitte eine technische Rolle eingeben")
        } else {
            const newUser: AppUser = {
                username: username,
                password: initialPassword,
                emailAddress: emailAddress,
                kpiOwner: kpiOwner,
                technicalRole: technicalRole
            };
            props.addNewUser(newUser)
                .then(() => setUsername(""))
                .then(() => setInitialPassword(""))
                .then(() => setEmailAddress(""))
                .then(() => setKpiOwner(""))
                .then(() => setTechnicalRole(""))
                .catch((error) => {
                        toast.error("Der User konnte nicht gespeichert werden!", error.response.data)
                    }
                )
        }
    }

    return (
        <div className={"add-user"}>
            <form className={"add-user-form"} onSubmit={onUserSubmit}>
                <FormControl id="add-user-input">
                    <TextField id="username-input" label="Benutzername" variant="outlined" value={username}
                               onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl id="add-user-input">
                    <TextField id="initial-password-input" label="Initial-Passwort" variant="outlined" type={"password"}
                               autoComplete={"off"}
                               value={initialPassword}
                               onChange={event => setInitialPassword(event.target.value)}/>
                </FormControl>
                <FormControl id="add-user-input">
                    <TextField id="email-input" label="Email-Adresse" variant="outlined" value={emailAddress}
                               onChange={event => setEmailAddress(event.target.value)}/>
                </FormControl>
                <FormControl id="add-user-select">
                    <InputLabel id="user-role-select">Rolle</InputLabel>
                    <Select
                        labelId="user-role-select"
                        id="user-role-select"
                        value={kpiOwner}
                        onChange={event => setKpiOwner(event.target.value)}>
                        {props.kpiOwners.map((owner) => (
                            <MenuItem key={owner.id}
                                      value={owner.kpiOwnerDescription}>{owner.kpiOwnerDescription}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl id="add-user-select">
                    <InputLabel id="technical-role-select">Technische Rolle</InputLabel>
                    <Select
                        labelId="technical-role-select"
                        id="technical-role-select"
                        value={technicalRole}
                        onChange={(event => setTechnicalRole(event.target.value))}>
                        <MenuItem value={"USER"}>User</MenuItem>
                        <MenuItem value={"ADMIN"}>Admin</MenuItem>
                    </Select>
                </FormControl>
                <button style={{maxWidth: 100, marginTop: 30, marginLeft: 180}} type={"submit"}>hinzufügen</button>
            </form>
        </div>
    )
}
