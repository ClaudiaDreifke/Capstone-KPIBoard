import {Kpi, NewKpi} from "../../model/Kpi";
import {UserDetails} from "../../model/UserDetails";
import {KpiOwner, NewKpiOwner} from "../../model/KpiOwner";
import {AppUser} from "../../model/AppUser";
import KpiGalleryAdmin from "../admin/KpiGalleryAdmin";
import KpiGalleryUser from "../user/KpiGalleryUser";

export type MyKpiProps = {
    kpis: Kpi[],
    appUsers: AppUser [] | undefined,
    loggedInUserDetails: UserDetails | undefined;
    targetValueUnitConvertToText: (stringToConvert: string | undefined) => string;
    targetValueOperatorConvertToText: (stringToConvert: string | undefined) => string;
    kpiOwners: KpiOwner[],
    deleteKpiById: (id: string) => Promise<void>;
    addNewKpi: (newKpi: NewKpi) => Promise<void>;
    addNewKpiOwner: (newUserRole: NewKpiOwner) => Promise<void>;
    addNewUser: (newUser: AppUser) => Promise<void>;
    logout: () => void;
}

export default function MyKpi(props: MyKpiProps) {
    return (
        <>
            {
                (props.loggedInUserDetails?.technicalRole === "ADMIN") ?
                    <KpiGalleryAdmin kpis={props.kpis}
                                     appUsers={props.appUsers}
                                     addNewKpi={props.addNewKpi}
                                     addNewKpiOwner={props.addNewKpiOwner}
                                     addNewUser={props.addNewUser}
                                     deleteKpiById={props.deleteKpiById}
                                     kpiOwners={props.kpiOwners}
                                     targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}
                                     targetValueUnitConvertToText={props.targetValueUnitConvertToText}
                                     logout={props.logout}/>
                    : <KpiGalleryUser kpis={props.kpis}
                                      loggedInUserDetails={props.loggedInUserDetails}
                                      targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}
                                      targetValueUnitConvertToText={props.targetValueUnitConvertToText}
                                      logout={props.logout}/>
            }
        </>
    )
}
