import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {KpiOwner} from "../../model/KpiOwner";
import {toast} from "react-toastify";
import {NewUser} from "../../model/AppUser";
import '../../styling/AddUser.css'


export type AddUserProps = {
    kpiOwners: KpiOwner[],
    addNewUser: (newUser: NewUser) => Promise<void>,
}

export default function AddUser(props: AddUserProps) {

    const [username, setUsername] = useState("")
    const [initialPassword, setInitialPassword] = useState("")
    const [emailAddress, setEmailAddress] = useState("")
    const [kpiOwner, setKpiOwner] = useState("")
    const [technicalRole, setTechnicalRole] = useState("")

    const onUserSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newUser: NewUser = {
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
            .catch(() => {
                    toast.error("Ihre Eingabe konnte nicht gespeichert werden! Bitte füllen Sie alle Felder korrekt aus!")
                }
            )
    }

    return (
        <div className={"add-user"}>
            <form className={"add-user-form"} onSubmit={onUserSubmit}>
                <FormControl id="add-user-input">
                    <TextField id="username-input" label="Username" variant="outlined" value={username}
                               onChange={event => setUsername(event.target.value)}/>
                </FormControl>
                <FormControl id="add-user-input">
                    <TextField id="initial-password-input" label="Initial-Passwort" variant="outlined"
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
