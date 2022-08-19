import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Kpi} from "../model/Kpi";
import useKpi from "../hooks/useKpi";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
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
        <>  <h2>Kennzahl hinzufügen</h2>
            <form className="add-kpi-form" onSubmit={onKpiSubmit}>
                <p>Name</p><input type={"text"} value={type} onChange={event => setType(event.target.value)}/>
                <p>Zielwert</p><input type={"number"} value={targetValue}
                                      onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                <p>Zielwert größer/kleiner</p>
                <Select
                    className={"selector"}
                    value={targetMathOperation}
                    onChange={handleSelectChange}>
                    <MenuItem value={"GREATER"}>größer</MenuItem>
                    <MenuItem value={"LESS"}>kleiner</MenuItem>
                    <MenuItem value={"EQUALS"}>gleich</MenuItem>
                </Select>
                <button type={"submit"}>hinzufügen</button>
            </form>
        </>
    )
}
