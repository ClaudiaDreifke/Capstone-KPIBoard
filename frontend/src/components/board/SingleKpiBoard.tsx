import {Kpi} from "../../model/Kpi";

export type SingleKpiBoardProps = {
    kpi: Kpi;
}

export default function SingleKpiBoard(props: SingleKpiBoardProps) {

    return (
        <>
            <tr>
                <th scope={"row"}>{props.kpi.name}</th>
                {props.kpi.comparedValues.map(v => <td key={v.month}> {v.trueFalseIndicator}</td>)}
            </tr>
        </>
    )
}
