import {Kpi} from "../model/Kpi";
import SingleKpi from "./SingleKpi";
import '../styling/KpiGalleryAdmin.css'

type KpiGalleryAdminProps = {
    kpis: Kpi[],
    deleteKpiById: (id: string) => void;
}

export default function KpiGalleryAdmin(props: KpiGalleryAdminProps) {

    return (
        <>
            <h3>Kennzahlen-Übersicht</h3>
            <ul className={"kpi-gallery-view"}>
                {props.kpis.map(kpi => <SingleKpi key={kpi.id} kpi={kpi} deleteKpiById={props.deleteKpiById}/>)}
            </ul>
        </>
    )
}
