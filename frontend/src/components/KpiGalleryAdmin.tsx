import {Kpi} from "../model/Kpi";
import SingleKpi from "./SingleKpi";
import AddKpi from "./AddKpi";

type KpiGalleryAdminProps = {
    kpis: Kpi[],
}

export default function KpiGalleryAdmin(props: KpiGalleryAdminProps) {

    return (
        <>
            <h2>Kennzahlen-Übersicht</h2>
            <ul>
                {props.kpis.map(kpi => <SingleKpi key={kpi.id} kpi={kpi}/>)}
            </ul>
            <AddKpi/>
        </>
    )
}