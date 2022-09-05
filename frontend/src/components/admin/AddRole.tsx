import {FormControl, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {NewRole} from "../../model/Role";
import {toast} from "react-toastify";

type AddRoleProps = {
    addNewRole: (newRole: NewRole) => Promise<void>;
}

export default function AddRole(props: AddRoleProps) {

    const [roleName, setRoleName] = useState("");

    const onRoleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newRole: NewRole = {
            roleName: roleName
        }
        props.addNewRole(newRole)
            .then(() => setRoleName(""))
            .catch(() => {
                toast.error("Ihre Eingabe konnte nicht gespeichert werden!")
            })
    }

    return (
        <div className={"add-role"}>
            <form onSubmit={onRoleSubmit}>
                <h3>Rolle hinzufügen</h3>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <TextField id="role-input" label="Rolle" variant="outlined" value={roleName}
                               onChange={event => setRoleName(event.target.value)}/>
                </FormControl>
                <button style={{maxWidth: 200, margin: 30}} type={"submit"}>hinzufügen</button>
            </form>
        </div>
    )
}
