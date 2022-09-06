import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import '../../styling/AddKpi.css'
import {toast} from "react-toastify";
import {NewKpi} from "../../model/Kpi";

type AddKpiProps = {
    addNewKpi: (newKpi: NewKpi) => Promise<void>;
}

export default function AddKpi(props: AddKpiProps) {

    const [name, setName] = useState<string>("")
    const [responsibleRole, setResponsibleRole] = useState("")
    const [targetValueOperator, setTargetValueOperator] = useState<string>("")
    const [targetValue, setTargetValue] = useState<string>("")
    const [targetValueUnit, setTargetValueUnit] = useState<string>("")


    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newKpi: NewKpi = {
            name: name,
            responsibleRole: responsibleRole,
            targetForKpi: {
                targetValueOperator: targetValueOperator,
                targetValue: Number(targetValue),
                targetValueUnit: targetValueUnit
            }
        };
        props.addNewKpi(newKpi)
            .then(() => setName(""))
            .then(() => setResponsibleRole(""))
            .then(() => setTargetValueOperator(""))
            .then(() => setTargetValue(""))
            .then(() => setTargetValueUnit(""))
            .catch(() => {
                    toast.error("Ihre Eingabe konnte nicht gespeichert werden! Bitte füllen Sie alle Felder korrekt aus!")
                }
            )
    }

    return (
        <div className={"add-kpi"}>
            <form className={"add-kpi-form"} onSubmit={onKpiSubmit}>
                <FormControl sx={{m: 1, minWidth: 300}}>
                    <TextField id="name-input" label="Name" variant="outlined" value={name}
                               onChange={event => setName(event.target.value)}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 300}}>
                    <InputLabel id="responsible-role-input">Verantwortlicher</InputLabel>
                    <Select
                        labelId="responsible-role-input"
                        id="responsible-role-input"
                        value={targetValueOperator}
                        onChange={event => setResponsibleRole(event.target.value)}>
                        <MenuItem value={"xyz"}>Hier wird mal eine Rolle aus der Liste stehen</MenuItem>
                        <MenuItem value={"yz"}>Hier wird mal eine Rolle aus der Liste stehen</MenuItem>
                        <MenuItem value={"z"}>Hier wird mal eine Rolle aus der Liste stehen</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 300}}>
                    <InputLabel id="target-value-operator-input">Vorzeichen</InputLabel>
                    <Select
                        labelId="target-value-operator-input"
                        id="target-value-operator-input"
                        value={targetValueOperator}
                        onChange={(event => setTargetValueOperator(event.target.value))}>
                        <MenuItem value={"GREATER"}>größer</MenuItem>
                        <MenuItem value={"LESS"}>kleiner</MenuItem>
                        <MenuItem value={"EQUALS"}>gleich</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 300}}>
                    <input className={"target-value-input-add"} type={"number"} placeholder={"     Zielwert"}
                           value={targetValue}
                           onChange={event => setTargetValue(event.target.value)}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 300}}>
                    <InputLabel id="target-value-unit-input">Einheit</InputLabel>
                    <Select
                        labelId="target-value-unit-input"
                        id="target-value-unit-input"
                        value={targetValueUnit}
                        onChange={(event => setTargetValueUnit(event.target.value))}>
                        <MenuItem value={"AMOUNT"}>Anzahl</MenuItem>
                        <MenuItem value={"PERCENTAGE"}>%</MenuItem>
                    </Select>
                    <button style={{maxWidth: 100, marginTop: 30, marginLeft: 180}} type={"submit"}>hinzufügen</button>
                </FormControl>
            </form>
        </div>
    )
}
