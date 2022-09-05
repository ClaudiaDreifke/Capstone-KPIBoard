import {Kpi, NewKpi} from "../../model/Kpi";
import SingleKpiAdmin from "./SingleKpiAdmin";
import '../../styling/KpiGalleryAdmin.css'
import AddKpi from "./AddKpi";
import AddRole from "./AddRole";
import {NewRole} from "../../model/Role";

type KpiGalleryAdminProps = {
    kpis: Kpi[],
    deleteKpiById: (id: string) => Promise<void>;
    addNewKpi: (newKpi: NewKpi) => Promise<void>;
    addNewRole: (newRole: NewRole) => Promise<void>;
    targetValueUnitConvertToText: (stringToConvert: string) => string;
    targetValueOperatorConvertToText: (stringToConvert: string) => string;
}

export default function KpiGalleryAdmin(props: KpiGalleryAdminProps) {

    return (
        <div className={"kpi-gallery-admin"}>
            <AddKpi addNewKpi={props.addNewKpi}/>
            <AddRole addNewRole={props.addNewRole}/>
            <ul className={"kpi-gallery-view"}>
                <h3 className={"headline"}> Kennzahlen-Übersicht</h3>
                {props.kpis.map(kpi => <SingleKpiAdmin key={kpi.id} kpi={kpi} deleteKpiById={props.deleteKpiById}
                                                       targetValueUnitConvertToText={props.targetValueUnitConvertToText}
                                                       targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}/>
                )}
            </ul>
        </div>
    )
}
