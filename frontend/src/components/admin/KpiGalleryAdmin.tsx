import {Kpi, NewKpi} from "../../model/Kpi";
import SingleKpiAdmin from "./SingleKpiAdmin";
import '../../styling/KpiGalleryAdmin.css'
import AddKpi from "./AddKpi";

type KpiGalleryAdminProps = {
    kpis: Kpi[],
    deleteKpiById: (id: string) => Promise<void>;
    addNewKpi: (newKpi: NewKpi) => Promise<void>;
    targetValueUnitConvertToText: (stringToConvert: string) => string;
    targetValueOperatorConvertToText: (stringToConvert: string) => string;
}

export default function KpiGalleryAdmin(props: KpiGalleryAdminProps) {

    return (
        <>
            <AddKpi addNewKpi={props.addNewKpi}/>
            <h3 className={"headline"}> Kennzahlen-Übersicht</h3>
            <ul className={"kpi-gallery-view"}>
                {props.kpis.map(kpi => <SingleKpiAdmin key={kpi.id} kpi={kpi} deleteKpiById={props.deleteKpiById}
                                                       targetValueUnitConvertToText={props.targetValueUnitConvertToText}
                                                       targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}/>
                )}
            </ul>
        </>
    )
}
