import {Kpi} from "../../model/Kpi";
import SingleKpiUser from "./SingleKpiUser";

export type KpiGalleryUserProps = {
    kpis: Kpi[],

}

export default function KpiGalleryUser(props: KpiGalleryUserProps) {

    return (
        <>
            <h3 className={"headline"}> Kennzahlen-Übersicht</h3>
            <ul className={"kpi-gallery-view"}>
                {props.kpis.map(kpi => <SingleKpiUser key={kpi.id} kpi={kpi}/>)}
            </ul>
        </>
    )
}
