import {Kpi} from "../../model/Kpi";
import '../../styling/GreenCell.css'

export type GreenCellProps = {
    kpi: Kpi,
}

export default function GreenCell(props: GreenCellProps) {
    return (
        <>
            <td className={"green"} key={props.kpi.id}/>
        </>
    )
}