import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import '../styling/AddKpi.css'
import {toast} from "react-toastify";

type AddKpiProps = {
    addNewKpi: (name: string, targetForKpi: { targetValueOperator: string, targetValue: number, targetValueUnit: string }) => Promise<void>;
}

export default function AddKpi(props: AddKpiProps) {

    const [name, setName] = useState<string>("")
    const [targetValueOperator, setTargetValueOperator] = useState<string>("")
    const [targetValue, setTargetValue] = useState<number>(0)
    const [targetValueUnit, setTargetValueUnit] = useState<string>("")

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addNewKpi(name, {targetValueOperator, targetValue, targetValueUnit})
            .then(() => setName(""))
            .then(() => setTargetValueOperator(""))
            .then(() => setTargetValue(0))
            .then(() => setTargetValueUnit(""))
            .catch(() => {
                toast.error("Ihre Eingabe konnte nicht gespeichert werden! Bitte füllen Sie alle Felder korrekt aus!")
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
        <div className={"add-kpi"}>
            <form onSubmit={onKpiSubmit}>
                <h3>Kennzahl hinzufügen</h3>
                <label htmlFor={"name-input"}>Name <input id={"name-input"} type={"text"} value={name}
                                                          onChange={event => setName(event.target.value)}/></label>
                <label htmlFor={"target-value-operator-input"}>Zielwert größer/kleiner/gleich
                    <Select
                        id={"target-value-operator-input"}
                        className={"selector"}
                        value={targetValueOperator}
                        onChange={handleSelectTargetValueOperatorChange}>
                        <MenuItem value={"GREATER"}>größer</MenuItem>
                        <MenuItem value={"LESS"}>kleiner</MenuItem>
                        <MenuItem value={"EQUALS"}>gleich</MenuItem>
                    </Select>
                </label>
                <label htmlFor={"target-value-input"}> Zielwert <input id={"target-value-input"} type={"number"}
                                                                       value={targetValue}
                                                                       onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                </label>
                <label htmlFor={"target-value-unit-input"}>Zielwert Einheit
                    <Select
                        id={"target-value-unit-input"}
                        className={"selector"}
                        value={targetValueUnit}
                        onChange={handleSelectTargetValueUnitChange}>
                        <MenuItem value={"ANZAHL"}>Anzahl</MenuItem>
                        <MenuItem value={"PROZENT"}>%</MenuItem>
                    </Select>
                </label>
                <button type={"submit"}>hinzufügen</button>
            </form>
        </div>
    )
}
