import {Kpi} from "../../model/Kpi";
import {useNavigate, useParams} from "react-router-dom";
import {FormControl, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import {FormEvent, useState} from "react";
import {MonthValuePair} from "../../model/MonthValuePair";
import {toast} from "react-toastify";
import '../../styling/ChangeKpiUser.css';
import DeleteIcon from '@mui/icons-material/Delete';


export type ChangeKpiUserProps = {
    kpis: Kpi[],
    updateKpiById: (updatedKpi: Kpi) => void;
    targetValueUnitConvertToText: (stringToConvert: string | undefined) => string;
    targetValueOperatorConvertToText: (stringToConvert: string | undefined) => string;
}

export default function ChangeKpiUser(props: ChangeKpiUserProps) {

    const navigate = useNavigate();
    const {id} = useParams();
    const kpi: Kpi | undefined = props.kpis.find((k: Kpi) => k.id === id);

    const [valueFromForm, setValueFromForm] = useState<number>(0)
    const [monthFromForm, setMonthFromForm] = useState<number>(0)
    const [monthValuePairs, setMonthValuePairs] = useState<MonthValuePair[]>(kpi?.values || [])



    const onValueSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!monthFromForm) {
            toast.error("Bitte den Monat eintragen!")
        } else if (monthValuePairs.some(element => element.month === monthFromForm)) {
            toast.error("Dieser Monat wurde bereits angelegt!")
        } else {
            setMonthValuePairs((prevValuesForm) => {
                const newArray = [
                    ...prevValuesForm,
                    {
                        month: monthFromForm,
                        value: valueFromForm,
                    },
                ]
                newArray.sort((a, b) => (a.month - b.month));
                return newArray;
            })
        }
    }

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (kpi) {
            const updatedKpi: Kpi = {
                id: kpi.id,
                name: kpi.name,
                values: monthValuePairs,
                ownedBy: kpi.ownedBy,
                targetForKpi: {
                    targetValueOperator: kpi.targetForKpi.targetValueOperator,
                    targetValue: kpi.targetForKpi.targetValue,
                    targetValueUnit: kpi.targetForKpi.targetValueUnit,
                },
                currentAverageValue: kpi.currentAverageValue,
            }
            props.updateKpiById(updatedKpi)
        } else {
            toast.error("Die Kennzahl konnte nicht geändert werden!")
        }
        navigate("/my-kpi")
    }

    const deleteValueOnClick = (month: number) => {
        return setMonthValuePairs(monthValuePairs.filter(monthValuePair => monthValuePair.month !== month))
    }

    return (
        <FormGroup id="add-values">
            <button style={{
                width: 20,
                backgroundColor: "white",
                borderColor: "white",
                color: "black",
                fontWeight: "bold",
                fontSize: "large",
                marginLeft: 470,
            }} onClick={() => navigate("/my-kpi")}>X
            </button>
            <h2>Kennzahlenwerte bearbeiten</h2>
            <FormGroup
                style={{marginLeft: 10, justifyContent: "start"}}>
                <h3>Kennzahl: {kpi?.name}<br/> {props.targetValueOperatorConvertToText(kpi?.targetForKpi.targetValueOperator)
                    + " " + kpi?.targetForKpi.targetValue + " " + props.targetValueUnitConvertToText(kpi?.targetForKpi.targetValueUnit)}
                </h3>
            </FormGroup>
            <form className={"value-input-form"} id={"value-input-form"} onSubmit={onValueSubmit}>
                <FormGroup>
                    <h4 style={{marginLeft: 10, marginTop: 0, marginBottom: 5}}> Werte:</h4>
                    <ul>{monthValuePairs.map((monthValuePair, month) => (
                        <li style={{listStyleType: "none", fontSize: "medium", marginBottom: 10}} key={month}>
                            <span>Monat: {monthValuePair.month} - </span>
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
                        label="month"
                        value={monthFromForm}
                        onChange={event => setMonthFromForm(Number(event.target.value))}>
                        <MenuItem value={0}>Bitte wählen</MenuItem>
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
                    <input className={"kpi-value-input"} type={"number"}
                           value={valueFromForm}
                           onChange={event => setValueFromForm(event.target.valueAsNumber)}/>
                </FormControl>
                <button style={{marginTop: 20, marginLeft: 310,}} type={"submit"}>Wert hinzufügen</button>
            </form>
            <form className={"change-kpi-form"} id={"change-kpi-form"} onSubmit={onKpiSubmit}>
                <button style={{marginTop: 20, marginLeft: 310, marginBottom: 20}} type={"submit"}>Kennzahl speichern
                </button>
            </form>
        </FormGroup>
    )
}
