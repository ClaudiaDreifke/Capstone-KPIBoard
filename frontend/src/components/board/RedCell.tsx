import {Kpi} from "../../model/Kpi";
import '../../styling/RedCell.css'

export type RedCellProps = {
    kpi: Kpi,
}

export default function RedCell(props: RedCellProps) {
    return (
        <>
            <td className={"red"} key={props.kpi.id}/>
        </>
    )
}
