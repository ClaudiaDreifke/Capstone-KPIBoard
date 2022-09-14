import {FormControl, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {KpiOwner, NewKpiOwner} from "../../model/KpiOwner";
import {toast} from "react-toastify";

type AddRoleProps = {
    kpiOwners: KpiOwner[],
    addNewUserRole: (newUserRole: NewKpiOwner) => Promise<void>;
}

export default function AddKpiOwner(props: AddRoleProps) {

    const [kpiOwnerDescription, setKpiOwnerDescription] = useState("");
    const kpiOwner: KpiOwner | undefined = props.kpiOwners?.find((k: KpiOwner) => k.kpiOwnerDescription === kpiOwnerDescription)


    const onRoleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!kpiOwnerDescription) {
            toast.error("Bitte die Rolle eintragen!")
        }
        if (kpiOwner) {
            toast.error("Diese Rolle existiert bereits, bitte wählen Sie eine andere Beschreibung")
        } else {
            const newUserRole: NewKpiOwner = {
                kpiOwnerDescription: kpiOwnerDescription
            }
            props.addNewUserRole(newUserRole)
                .then(() => setKpiOwnerDescription(""))
                .catch(() => {
                        toast.error("Ihre Eingabe konnte nicht gespeichert werden! Bitte füllen Sie alle Felder korrekt aus!")
                    }
                )
        }
    }

    return (
        <div className={"add-role"}>
            <form onSubmit={onRoleSubmit}>
                <FormControl sx={{m: 1, minWidth: 300}}>
                    <TextField id="role-input" label="Rolle" variant="outlined" value={kpiOwnerDescription}
                               onChange={event => setKpiOwnerDescription(event.target.value)}/>
                </FormControl>
                <button style={{maxWidth: 100, margin: 30}} type={"submit"}>hinzufügen</button>
            </form>
        </div>
    )
}
