import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {FormEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import {Kpi} from "../model/Kpi";
import '../styling/ChangeKpiAdmin.css'

export type ChangeKpiAdminProps = {
    kpis: Kpi[],
    updateKpiById: (updatedKpi: Kpi) => void;
}

export default function ChangeKpiAdmin(props: ChangeKpiAdminProps) {

    const navigate = useNavigate();
    const {id} = useParams();
    const kpi: Kpi | undefined = props.kpis.find((k: Kpi) => k.id === id);


    const [name, setName] = useState<string>(kpi?.name || "")
    const [targetValueOperator, setTargetValueOperator] = useState<string>(kpi?.targetForKpi?.targetValueOperator || "")
    const [targetValue, setTargetValue] = useState<number>(kpi?.targetForKpi?.targetValue || 0)
    const [targetValueUnit, setTargetValueUnit] = useState<string>(kpi?.targetForKpi?.targetValueUnit || "")

    useEffect(() => {
        setName(kpi?.name || "");
        setTargetValueOperator(kpi?.targetForKpi?.targetValueOperator || "")
        setTargetValue(kpi?.targetForKpi?.targetValue || 0)
        setTargetValueUnit(kpi?.targetForKpi?.targetValueUnit || "")
    }, [kpi])

    const onKpiSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (kpi) {
            const updatedKpi: Kpi = {
                id: kpi.id,
                name: name,
                values: kpi.values,
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
    }

    const handleSelectTargetValueOperatorChange = (event: SelectChangeEvent) => {
        setTargetValueOperator(event.target.value)
    }

    const handleSelectTargetValueUnitChange = (event: SelectChangeEvent) => {
        setTargetValueUnit(event.target.value)
    }

    return (
        <>
            <form onSubmit={onKpiSubmit}>
                <h3>Kennzahl ändern</h3>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <TextField id="name-input" label="Name" variant="outlined" value={name}
                               onChange={event => setName(event.target.value)}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="target-value-operator-input"></InputLabel>
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
                               id="target-value-input" label="Zielwert" type="number" variant="outlined"
                               value={targetValue}
                               onChange={event => setTargetValue(Number(event.target.value))}/>
                </FormControl>
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="target-value-unit-input"></InputLabel>
                    <Select
                        labelId="target-value-unit-input"
                        id="target-value-unit-input"
                        value={targetValueUnit}
                        onChange={handleSelectTargetValueUnitChange}>
                        <MenuItem value={"ANZAHL"}>Anzahl</MenuItem>
                        <MenuItem value={"PROZENT"}>%</MenuItem>
                    </Select>
                    <button id={"back-to-admin-view"} onClick={() => navigate("/admin")}>zurück</button>
                    <button type={"submit"}>ändern</button>
                </FormControl>
            </form>
        </>
    )
}
