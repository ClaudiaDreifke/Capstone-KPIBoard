import {Kpi} from "../../model/Kpi";
import SingleKpiUser from "./SingleKpiUser";
import {UserDetails} from "../../model/UserDetails";
import NavBar from "../shared/NavBar";

export type KpiGalleryUserProps = {
    kpis: Kpi[],
    loggedInUserDetails: UserDetails | undefined;
    targetValueUnitConvertToText: (stringToConvert: string | undefined) => string;
    targetValueOperatorConvertToText: (stringToConvert: string | undefined) => string;
    logout: () => void
}

export default function KpiGalleryUser(props: KpiGalleryUserProps) {

    return (
        <>
            <NavBar logout={props.logout}/>
            <ul className={"kpi-gallery-view"}>
                <h2 className={"headline"}> Kennzahlen-Übersicht</h2>

                {props.kpis.filter(kpi => kpi.ownedBy === props.loggedInUserDetails?.kpiOwner).map(kpi => <SingleKpiUser
                    key={kpi.id} kpi={kpi}
                    targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}
                    targetValueUnitConvertToText={props.targetValueUnitConvertToText}/>)}
            </ul>
        </>
    )
}
