import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Kpi} from "../model/Kpi";
import useKpi from "../hooks/useKpi";
import {InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import '../styling/AddKpi.css'


type AddKpiProps = {
    addNewKpi: (type: string, targetValue: number, targetMathOperation: string) => Promise<Kpi>,
}

export default function AddKpi(props: AddKpiProps) {

    const {notify} = useKpi();

    const [type, setType] = useState<string>("")
    const [targetMathOperation, setTargetMathOperation] = useState<string>("")
    const [targetValue, setTargetValue] = useState<number>(0)

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.addNewKpi(type, targetValue, targetMathOperation)
            .then(() => setType(""))
            .then(() => setTargetMathOperation(""))
            .then(() => setTargetValue(0))
            .catch((error) => {
                notify(error.message)
            })
    }

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        setTargetMathOperation(event.target.value)
    }


    return (
        <>  <p>Kennzahl hinzufügen</p>
            <form className="add-kpi-form" onSubmit={onKpiSubmit}>
                <input type={"text"} placeholder={"Name"} value={type} onChange={event => setType(event.target.value)}/>
                <InputLabel>bitte wählen</InputLabel>
                <Select
                    className={"selector"}
                    value={targetMathOperation}
                    label={"größer"}
                    onChange={handleSelectChange}>
                    <MenuItem value={"Greater"}>größer</MenuItem>
                    <MenuItem value={"Less"}>kleiner</MenuItem>
                    <MenuItem value={"Equal"}>gleich</MenuItem>
                </Select>
                <input type={"number"} placeholder={"Zielwert"} value={targetValue}
                       onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                <button type={"submit"}>hinzufügen</button>
            </form>
        </>
    )
}
