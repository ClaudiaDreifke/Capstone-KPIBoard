import {Kpi} from "../../model/Kpi";
import {useNavigate, useParams} from "react-router-dom";
import {FormControl, FormGroup, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
import {MonthValuePair} from "../../model/MonthValuePair";
import {toast} from "react-toastify";
import '../../styling/ChangeKpiUser.css';
import DeleteIcon from '@mui/icons-material/Delete';


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
    const [monthValuePairsFromForm, setMonthValuePairsFromForm] = useState<MonthValuePair[]>(kpi?.values || [])


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
        if (!monthFromForm) {
            toast.error("Bitte Monat eintragen")
        } else if (monthValuePairsFromForm.some(element => element.month === monthFromForm)) {
            toast.error("Dieser Monat wurde bereits angelegt")
        } else {
            setMonthValuePairsFromForm((prevValuesForm) => [
                ...prevValuesForm,
                {
                    month: monthFromForm,
                    value: valueFromForm,
                },
            ])

        }
    }

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (kpi) {
            const updatedKpi: Kpi = {
                id: kpi.id,
                name: kpi.name,
                values: monthValuePairsFromForm,
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
        navigate("/my-kpi")
    }

    const deleteValueOnClick = (month: number) => {
        return setMonthValuePairsFromForm(monthValuePairsFromForm.filter(monthValuePair => monthValuePair.month !== month))
    }

    return (
        <FormGroup className={"add-values"}>
            <h3 style={{marginTop: 30, marginBottom: 10, marginLeft: 20}}>Kennzahlenwerte hinzufügen</h3>
            <FormGroup
                style={{flex: 2, flexDirection: "row", marginLeft: 20, justifyContent: "start", marginBottom: 10}}>
                <h4>Kennzahl: {kpi?.name}<br/>Zielwert: {targetValueOperatorToText()} {kpi?.targetForKpi.targetValue} {targetValueUnitToText()}
                </h4>
            </FormGroup>
            <form className={"value-input-form"} id={"value-input-form"} onSubmit={onValueSubmit}>
                <FormGroup>
                    <h4 style={{marginLeft: 10, marginTop: 0, marginBottom: 5}}> Werte:</h4>
                    <ul>{monthValuePairsFromForm.sort((a, b) => (a.month - b.month))
                        .map((monthValuePair, month) => (
                            <li style={{listStyleType: "none", fontSize: "medium", marginBottom: 10}} key={month}>
                                <span>Monat: {monthValuePair.month} </span>
                                <span> Wert: {monthValuePair.value} </span>
                                <DeleteIcon sx={{fontSize: 17}}
                                            onClick={_event => deleteValueOnClick(monthValuePair.month)}/>
                            </li>
                        ))}
                    </ul>
                </FormGroup>
                <FormControl sx={{m: 1, minWidth: 200}}>
                    <InputLabel id="month">Monat</InputLabel>
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
                               id="target-value" label="Wert" variant="outlined"
                               value={valueFromForm}
                               onChange={event => setValueFromForm(Number(event.target.value))}/>
                </FormControl>
                <FormGroup style={{flex: 2, flexDirection: "row", marginLeft: 20, justifyContent: "flex-end"}}>

                    <button type={"submit"}>Wert hinzufügen</button>
                </FormGroup>
            </form>
            <form className={"change-kpi-form"} id={"change-kpi-form"} onSubmit={onKpiSubmit}>
                <FormGroup style={{flex: 2, flexDirection: "row", marginLeft: 20, justifyContent: "flex-start"}}>
                    <button id={"back-to-admin-view"} onClick={() => navigate("/my-kpi")}>zurück</button>
                    <button type={"submit"}>speichern</button>
                </FormGroup>
            </form>
        </FormGroup>

    )
}
