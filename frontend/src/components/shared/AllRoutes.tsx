import {Route, Routes} from "react-router-dom";
import KpiGalleryAdmin from "../admin/KpiGalleryAdmin";
import ChangeKpiAdmin from "../admin/ChangeKpiAdmin";
import useKpi from "../../hooks/useKpi";
import KpiGalleryUser from "../user/KpiGalleryUser";
import ChangeKpiUser from "../user/ChangeKpiUser";
import KpiBoard from "../board/KpiBoard";
import useRole from "../../hooks/useRole";
import RoleGalleryAdmin from "../admin/RoleGalleryAdmin";
import useUser from "../../hooks/useUser";

export default function AllRoutes() {

    const {
        kpis,
        addNewKpi,
        deleteKpiById,
        updateKpiById,
        targetValueUnitConvertToText,
        targetValueOperatorConvertToText
    } = useKpi();

    const {
        userRoles,
        addNewUserRole,
        deleteUserRoleById,
    } = useRole();

    const {
        addNewUser
    } = useUser();

    return (
        <>
            <Routes>
                <Route path={"/"}
                       element={<KpiBoard kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                          targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} userRoles={userRoles} addNewKpi={addNewKpi}
                                                 deleteKpiById={deleteKpiById}
                                                 addNewUserRole={addNewUserRole} addNewUser={addNewUser}
                                                 targetValueUnitConvertToText={targetValueUnitConvertToText}
                                                 targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/admin/roles"}
                       element={<RoleGalleryAdmin userRoles={userRoles} deleteUserRoleById={deleteUserRoleById}/>}/>
                <Route path={"/admin/change/:id"}
                       element={<ChangeKpiAdmin kpis={kpis} userRoles={userRoles} updateKpiById={updateKpiById}/>}/>
                <Route path={"/my-kpi"}
                       element={<KpiGalleryUser kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                                targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/my-kpi/change/:id"}
                       element={<ChangeKpiUser kpis={kpis} updateKpiById={updateKpiById}/>}/>
            </Routes>
        </>
    )
}
