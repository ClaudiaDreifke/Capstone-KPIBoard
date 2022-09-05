import {Kpi} from "../../model/Kpi";
import SingleKpiUser from "./SingleKpiUser";

export type KpiGalleryUserProps = {
    kpis: Kpi[],
    targetValueUnitConvertToText: (stringToConvert: string) => string;
    targetValueOperatorConvertToText: (stringToConvert: string) => string;
}

export default function KpiGalleryUser(props: KpiGalleryUserProps) {

    return (
        <>
            <ul className={"kpi-gallery-view"}>
                <h3 className={"headline"}> Kennzahlen-Übersicht</h3>
                {props.kpis.map(kpi => <SingleKpiUser key={kpi.id} kpi={kpi}
                                                      targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}
                                                      targetValueUnitConvertToText={props.targetValueUnitConvertToText}/>)}
            </ul>
        </>
    )
}
