import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {Kpi} from "../../model/Kpi";
import '../../styling/ChangeKpiAdmin.css'

export type ChangeKpiAdminProps = {
    kpis: Kpi[],
    updateKpiById: (updatedKpi: Kpi) => void;
}

export default function ChangeKpiAdmin(props: ChangeKpiAdminProps) {

    const navigate = useNavigate();
    const {id} = useParams();
    const kpi: Kpi | undefined = props.kpis.find((k: Kpi) => k.id === id);

    const [targetValueOperator, setTargetValueOperator] = useState<string>(kpi?.targetForKpi?.targetValueOperator || "")
    const [targetValue, setTargetValue] = useState<number>(kpi?.targetForKpi?.targetValue || 0)
    const [targetValueUnit, setTargetValueUnit] = useState<string>(kpi?.targetForKpi?.targetValueUnit || "")

    useEffect(() => {
        setTargetValueOperator(kpi?.targetForKpi?.targetValueOperator || "")
        setTargetValue(kpi?.targetForKpi?.targetValue || 0)
        setTargetValueUnit(kpi?.targetForKpi?.targetValueUnit || "")
    }, [kpi])

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (kpi) {
            const updatedKpi: Kpi = {
                id: kpi.id,
                name: kpi.name,
                values: kpi.values,
                comparedValues: kpi.comparedValues,
                targetForKpi: {
                    targetValueOperator: targetValueOperator,
                    targetValue: targetValue,
                    targetValueUnit: targetValueUnit
                }
            }
            props.updateKpiById(updatedKpi)
        } else {
            toast.error("Die Kennzahl konnte nicht geändert werden")
        }
        navigate("/admin")
    }

    return (
        <>
            <form onSubmit={onKpiSubmit}>
                <h3>Kennzahl ändern</h3>
                <p className={"name"} id="name">{kpi?.name}</p>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="target-value-operator"></InputLabel>
                    <Select
                        labelId="target-value-operator"
                        id="target-value-operator"
                        value={targetValueOperator}
                        onChange={event => setTargetValueOperator(event.target.value)}>
                        <MenuItem value={"GREATER"}>größer</MenuItem>
                        <MenuItem value={"LESS"}>kleiner</MenuItem>
                        <MenuItem value={"EQUALS"}>gleich</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <TextField inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                               id="target-value" label="Zielwert" variant="outlined"
                               value={targetValue}
                               onChange={event => setTargetValue(Number(event.target.value))}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="target-value-unit"></InputLabel>
                    <Select
                        labelId="target-value-unit"
                        id="target-value-unit"
                        value={targetValueUnit}
                        onChange={event => setTargetValueUnit(event.target.value)}>
                        <MenuItem value={"AMOUNT"}>Anzahl</MenuItem>
                        <MenuItem value={"PERCENTAGE"}>%</MenuItem>
                    </Select>
                </FormControl>
                <button style={{maxWidth: 150}} id={"back-to-admin-view"} onClick={() => navigate("/admin")}>zurück
                </button>
                <button style={{maxWidth: 150}} type={"submit"}>speichern</button>
            </form>
        </>
    )
}
