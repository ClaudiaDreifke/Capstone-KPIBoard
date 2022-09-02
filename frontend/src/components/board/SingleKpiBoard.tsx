import {Kpi} from "../../model/Kpi";
import GreenCell from "./GreenCell";
import RedCell from "./RedCell";

export type SingleKpiBoardProps = {
    kpi: Kpi;
}

export default function SingleKpiBoard(props: SingleKpiBoardProps) {

    return (
        <>
            <tr>
                <th scope={"row"}>{props.kpi.name}</th>

                {props.kpi.comparedValues.map(v => {
                    if (v.trueFalseIndicator === 1) {
                        return <GreenCell kpi={props.kpi}/>
                    }
                    return (<RedCell kpi={props.kpi}/>)
                })}

            </tr>
        </>
    )
}
