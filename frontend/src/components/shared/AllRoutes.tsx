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
import LoginPage from "./LoginPage";

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
        kpiOwners,
        addNewKpiOwner,
        deleteKpiOwnerById,
    } = useRole();

    const {
        addNewUser,
        login,
        loggedInUserDetails,
    } = useUser();

    return (
        <>
            <Routes>
                <Route path={"/kpi-board"}
                       element={<KpiBoard kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                          targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} kpiOwners={kpiOwners} addNewKpi={addNewKpi}
                                                 deleteKpiById={deleteKpiById}
                                                 addNewKpiOwner={addNewKpiOwner} addNewUser={addNewUser}
                                                 targetValueUnitConvertToText={targetValueUnitConvertToText}
                                                 targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/admin/roles"}
                       element={<RoleGalleryAdmin kpiOwners={kpiOwners} deleteKpiOwnerById={deleteKpiOwnerById}/>}/>
                <Route path={"/admin/change/:id"}
                       element={<ChangeKpiAdmin kpis={kpis} kpiOwners={kpiOwners} updateKpiById={updateKpiById}/>}/>
                <Route path={"/my-kpi"}
                       element={<KpiGalleryUser kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                                targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/my-kpi/change/:id"}
                       element={<ChangeKpiUser kpis={kpis} updateKpiById={updateKpiById}/>}/>
                <Route path={"/login"}
                       element={<LoginPage login={login} loggedInUserDetails={loggedInUserDetails}/>}/>
            </Routes>
        </>
    )
}
