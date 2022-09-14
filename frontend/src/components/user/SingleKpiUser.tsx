import {Kpi} from "../../model/Kpi";
import {useNavigate} from "react-router-dom";
import '../../styling/SingleKpiUser.css'

type SingleKpiUserProps = {
    kpi: Kpi,
    targetValueUnitConvertToText: (stringToConvert: string | undefined) => string;
    targetValueOperatorConvertToText: (stringToConvert: string | undefined) => string;
}

export default function SingleKpiUser(props: SingleKpiUserProps) {

    const navigate = useNavigate();

    return (
        <section className={"show-single-kpi-user"} key={props.kpi.id}>
            <p className={"description-single-kpi"}> {props.kpi.name}</p>
            <p className={"description-single-kpi"}> Zielwert: {props.targetValueOperatorConvertToText(props.kpi.targetForKpi.targetValueOperator)
                + " " + props.kpi.targetForKpi.targetValue + " " + props.targetValueUnitConvertToText(props.kpi.targetForKpi.targetValueUnit)}</p>
            <button className={"single-kpi-user-button"} onClick={() => {
                navigate(`/my-kpi/change/${props.kpi.id}`)
            }}>Werte bearbeiten
            </button>
        </section>
    )
}
