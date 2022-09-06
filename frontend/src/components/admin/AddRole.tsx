import {FormControl, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {NewRole} from "../../model/Role";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

type AddRoleProps = {
    addNewRole: (newRole: NewRole) => Promise<void>;
}

export default function AddRole(props: AddRoleProps) {

    const navigate = useNavigate()
    const [roleName, setRoleName] = useState("");

    const onRoleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!roleName) {
            toast.error("Bitte die Rolle eintragen!")
        } else {
            const newRole: NewRole = {
                roleName: roleName
            }
            props.addNewRole(newRole)
                .then(() => setRoleName(""))
                .catch(() => {
                        toast.error("Ihre Eingabe konnte nicht gespeichert werden! Bitte füllen Sie alle Felder korrekt aus!")
                    }
                )
        }
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
                <button style={{maxWidth: 200, margin: 30}} onClick={() => navigate("/admin/roles")}> Alle Rollen
                </button>
            </form>
        </div>
    )
}
