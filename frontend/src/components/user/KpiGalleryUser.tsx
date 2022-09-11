import {Kpi} from "../../model/Kpi";
import SingleKpiUser from "./SingleKpiUser";

export type KpiGalleryUserProps = {
    kpis: Kpi[],
    targetValueUnitConvertToText: (stringToConvert: string | undefined) => string;
    targetValueOperatorConvertToText: (stringToConvert: string | undefined) => string;
}

export default function KpiGalleryUser(props: KpiGalleryUserProps) {

    return (
        <>
            <ul className={"kpi-gallery-view"}>
                <h2 className={"headline"}> Kennzahlen-Übersicht</h2>
                {props.kpis.map(kpi => <SingleKpiUser key={kpi.id} kpi={kpi}
                                                      targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}
                                                      targetValueUnitConvertToText={props.targetValueUnitConvertToText}/>)}
            </ul>
        </>
    )
}
