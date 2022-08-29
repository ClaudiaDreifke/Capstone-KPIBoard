import {Kpi} from "../../model/Kpi";
import {useNavigate, useParams} from "react-router-dom";
import {FormControl, FormGroup, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {Value} from "../../model/Value";
import {toast} from "react-toastify";

export type ChangeKpiUserProps = {
    kpis: Kpi[],
    updateKpiById: (updatedKpi: Kpi) => void;
}

export default function ChangeKpiUser(props: ChangeKpiUserProps) {

    const navigate = useNavigate();
    const {id} = useParams();
    const kpi: Kpi | undefined = props.kpis.find((k: Kpi) => k.id === id);

    const [valueFromForm, setValueFromForm] = useState<number>(0)
    const [monthFromForm, setMonthFromForm] = useState<number>(0)
    const [valuesFromForm, setValuesFromForm] = useState<Value[]>([])


    const targetValueOperatorToText = () => {
        if (kpi?.targetForKpi.targetValueOperator === "LESS") return <>kleiner</>;
        if (kpi?.targetForKpi.targetValueOperator === "GREATER") return <>größer</>;
        else return <>gleich</>;
    }

    const targetValueUnitToText = () => {
        if (kpi?.targetForKpi.targetValueUnit === "ANZAHL") return <> Stk.</>;
        else return <>%</>;
    }

    const onValueSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValuesFromForm((prevValuesForm) => [
            ...prevValuesForm,
            {
                month: monthFromForm,
                value: valueFromForm,
            },
        ]);
    }

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (kpi) {

            const updatedKpi: Kpi = {
                id: kpi.id,
                name: kpi.name,
                values: valuesFromForm,
                targetForKpi: {
                    targetValueOperator: kpi.targetForKpi.targetValueOperator,
                    targetValue: kpi.targetForKpi.targetValue,
                    targetValueUnit: kpi.targetForKpi.targetValueUnit,
                }
            }
            props.updateKpiById(updatedKpi)
        } else {
            toast.error("Die Kennzahl konnte nicht geändert werden")
        }
    }


    return (
        <>
            <h3>Kennzahl ändern</h3>
            <FormGroup style={{flex: 2, flexDirection: "row", marginLeft: 10, justifyContent: "start"}}>
                <p>{kpi?.name}</p>
                <p style={{marginLeft: 20}}> Zielwert: {targetValueOperatorToText()} {kpi?.targetForKpi.targetValue} {targetValueUnitToText()}</p>
            </FormGroup>
            <form id={"value-input-form"} onSubmit={onValueSubmit}>
                <h4 style={{marginLeft: 10}}> Werte:</h4>
                <ul>{valuesFromForm.map((value, month) => (
                    <li key={month}>
                        <span>month: {value.month}</span>{" "}
                        <span>value: {value.value}</span>
                    </li>
                ))}
                </ul>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="month"></InputLabel>
                    <Select
                        labelId="month"
                        id="month"
                        value={monthFromForm}
                        onChange={event => setMonthFromForm(Number(event.target.value))}>
                        <MenuItem value={1}>Januar</MenuItem>
                        <MenuItem value={2}>Februar</MenuItem>
                        <MenuItem value={3}>März</MenuItem>
                        <MenuItem value={4}>April</MenuItem>
                        <MenuItem value={5}>Mai</MenuItem>
                        <MenuItem value={6}>Juni</MenuItem>
                        <MenuItem value={7}>Juli</MenuItem>
                        <MenuItem value={8}>August</MenuItem>
                        <MenuItem value={9}>September</MenuItem>
                        <MenuItem value={10}>Oktober</MenuItem>
                        <MenuItem value={11}>November</MenuItem>
                        <MenuItem value={12}>Dezember</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <TextField inputProps={{inputMode: 'numeric'}}
                               id="target-value" label="Wert" type="number" variant="outlined"
                               value={valueFromForm}
                               onChange={event => setValueFromForm(Number(event.target.value))}/>
                </FormControl>
                <button type={"submit"}>Wert hinzufügen</button>
            </form>
            <form id={"change-kpi-form"} onSubmit={onKpiSubmit}>
                <FormGroup style={{flex: 2, flexDirection: "row", marginLeft: 20, justifyContent: "flex-start"}}>
                    <button id={"back-to-admin-view"} onClick={() => navigate("/my-kpi")}>zurück</button>
                    <button type={"submit"}>ändern</button>
                </FormGroup>
            </form>
        </>
    )
}
