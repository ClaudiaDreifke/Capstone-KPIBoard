import {FormEvent, useState} from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Kpi} from "../model/Kpi";
import useKpi from "../hooks/useKpi";


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

    return (
        <>
            <form className="add-kpi-form" onSubmit={onKpiSubmit}>
                <input type={"text"} value={type} onChange={event => setType(event.target.value)}/>
                <input type={"text"} value={targetMathOperation}
                       onChange={event => setTargetMathOperation(event.target.value)}/>
                <input type={"number"} value={targetValue}
                       onChange={event => setTargetValue(event.target.valueAsNumber)}/>
                <button type={"submit"}></button>
            </form>
        </>
    )
}