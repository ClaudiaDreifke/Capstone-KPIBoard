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
                }
            )
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
                <label htmlFor={"name-input"}>Name<input id={"name-input"} type={"text"} value={name}
                                                         onChange={event => setName(event.target.value)}/></label>
                <label htmlFor={"target-value-operator-input"}>Zielwert größer/kleiner/gleich
                    <Select
                        id={"target-value-operator-input"}
                        value={targetValueOperator}
                        onChange={handleSelectTargetValueOperatorChange}>
                        <MenuItem value={"GREATER"}>größer</MenuItem>
                        <MenuItem value={"LESS"}>kleiner</MenuItem>
                        <MenuItem value={"EQUALS"}>gleich</MenuItem>
                    </Select>
                </label>
                <label htmlFor={"target-value-input"}>Zielwert<input id={"targetValue"} type={"number"}
                                                                     value={targetValue}
                                                                     onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                </label>
                <label htmlFor={"target-value-unit-input"}>Zielwert Einheit
                    <Select
                        className={"selector"}
                        value={targetValueUnit}
                        onChange={handleSelectTargetValueUnitChange}>
                        <MenuItem value={"ANZAHL"}>Anzahl</MenuItem>
                        <MenuItem value={"PROZENT"}>%</MenuItem>
                    </Select>
                </label>
                <button type={"submit"}>hinzufügen</button>
            </form>
        </>
    )
}
