import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import '../../styling/AddKpi.css'
import {toast} from "react-toastify";
import {NewKpi} from "../../model/Kpi";

type AddKpiProps = {
    addNewKpi: (newKpi: NewKpi) => Promise<void>;
}

export default function AddKpi(props: AddKpiProps) {

    const [name, setName] = useState<string>("")
    const [targetValueOperator, setTargetValueOperator] = useState<string>("")
    const [targetValue, setTargetValue] = useState<number>(0)
    const [targetValueUnit, setTargetValueUnit] = useState<string>("")

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newKpi: NewKpi = {
            name: name,
            targetForKpi: {
                targetValueOperator: targetValueOperator,
                targetValue: targetValue,
                targetValueUnit: targetValueUnit
            }
        };
        props.addNewKpi(newKpi)
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
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <TextField id="name-input" label="Name" variant="outlined" value={name}
                               onChange={event => setName(event.target.value)}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="target-value-operator-input">Vorzeichen</InputLabel>
                    <Select
                        labelId="target-value-operator-input"
                        id="target-value-operator-input"
                        value={targetValueOperator}
                        onChange={handleSelectTargetValueOperatorChange}>
                        <MenuItem value={"GREATER"}>größer</MenuItem>
                        <MenuItem value={"LESS"}>kleiner</MenuItem>
                        <MenuItem value={"EQUALS"}>gleich</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                               id="target-value-input" label="Zielwert" variant="outlined"
                               value={targetValue}
                               onChange={event => setTargetValue(Number(event.target.value))}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="target-value-unit-input">Einheit</InputLabel>
                    <Select
                        labelId="target-value-unit-input"
                        id="target-value-unit-input"
                        value={targetValueUnit}
                        onChange={handleSelectTargetValueUnitChange}>
                        <MenuItem value={"AMOUNT"}>Anzahl</MenuItem>
                        <MenuItem value={"PERCENTAGE"}>%</MenuItem>
                    </Select>
                    <button style={{maxWidth: 200, margin: 30}} type={"submit"}>hinzufügen</button>
                </FormControl>
            </form>
        </div>
    )
}
