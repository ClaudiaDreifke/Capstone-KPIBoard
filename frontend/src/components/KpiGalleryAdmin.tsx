import {Kpi} from "../model/Kpi";
import SingleKpi from "./SingleKpi";
import AddKpi from "./AddKpi";
import '../styling/KpiGalleryAdmin.css'

type KpiGalleryAdminProps = {
    kpis: Kpi[],
}

export default function KpiGalleryAdmin(props: KpiGalleryAdminProps) {

    return (
        <>
            <h2>Admin-Ansicht</h2>
            <h3>Kennzahlen-Übersicht</h3>
            <ul className={"kpi-gallery-view"}>
                {props.kpis.map(kpi => <SingleKpi key={kpi.id} kpi={kpi}/>)}
            </ul>
            <AddKpi/>
        </>
    )
}