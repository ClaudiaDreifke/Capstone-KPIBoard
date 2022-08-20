import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import useKpi from "../hooks/useKpi";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import '../styling/AddKpi.css'


export default function AddKpi() {

    const {addNewKpi, notify} = useKpi();

    const [name, setName] = useState<string>("")
    const [targetValueOperator, setTargetValueOperator] = useState<string>("")
    const [targetValue, setTargetValue] = useState<number>(0)
    const [targetValueUnit, setTargetValueUnit] = useState<string>("")

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addNewKpi(name, {targetValueOperator, targetValue, targetValueUnit})
            .then(() => setName(""))
            .then(() => setTargetValueOperator(""))
            .then(() => setTargetValue(0))
            .then(() => setTargetValueUnit(""))
            .catch(() => {
                notify("Ihre Eingabe konnte nicht gespeichert werden! Bitte füllen Sie alle Felder korrekt aus!")
            })
    }

    const handleSelectTargetValueOperatorChange = (event: SelectChangeEvent<string>) => {
        setTargetValueOperator(event.target.value)
    }

    const handleSelectTargetValueUnitChange = (event: SelectChangeEvent<string>) => {
        setTargetValueUnit(event.target.value)
    }

    return (
        <>  <h2>Kennzahl hinzufügen</h2>
            <form className="add-kpi-form" onSubmit={onKpiSubmit}>
                <p>Name</p><input type={"text"} value={name} onChange={event => setName(event.target.value)}/>
                <p>Zielwert größer/kleiner/gleich</p>
                <Select
                    className={"selector"}
                    value={targetValueOperator}
                    onChange={handleSelectTargetValueOperatorChange}>
                    <MenuItem value={"GREATER"}>größer</MenuItem>
                    <MenuItem value={"LESS"}>kleiner</MenuItem>
                    <MenuItem value={"EQUALS"}>gleich</MenuItem>
                </Select>
                <p>Zielwert</p><input type={"number"} value={targetValue}
                                      onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                <p>Zielwert Einheit</p>
                <Select
                    className={"selector"}
                    value={targetValueUnit}
                    onChange={handleSelectTargetValueUnitChange}>
                    <MenuItem value={"ANZAHL"}>Anzahl</MenuItem>
                    <MenuItem value={"PROZENT"}>%</MenuItem>
                </Select>

                <button type={"submit"}>hinzufügen</button>
            </form>
        </>
    )
}
