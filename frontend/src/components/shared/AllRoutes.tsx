import {Route, Routes} from "react-router-dom";
import ChangeKpiAdmin from "../admin/ChangeKpiAdmin";
import useKpi from "../../hooks/useKpi";
import ChangeKpiUser from "../user/ChangeKpiUser";
import KpiBoard from "../board/KpiBoard";
import useRole from "../../hooks/useRole";
import RoleGalleryAdmin from "../admin/RoleGalleryAdmin";
import MyKpi from "./MyKpi";
import LoginPage from "./LoginPage";
import React from "react";
import useUser from "../../hooks/useUser";
import WelcomePage from "./WelcomePage";

export default function AllRoutes() {

    const {
        kpis,
        addNewKpi,
        getAllKpis,
        deleteKpiById,
        updateKpiById,
        targetValueUnitConvertToText,
        targetValueOperatorConvertToText
    } = useKpi();

    const {
        kpiOwners,
        getAllKpiOwner,
        addNewKpiOwner,
        deleteKpiOwnerById,
    } = useRole();

    const {
        loggedInUserDetails,
        addNewUser,
        login,
        logout
    } = useUser({getAllKpis, getAllKpiOwner})

    return (
        <>
            <Routes>
                <Route path={"/kpi-board"}
                       element={<KpiBoard kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                          targetValueOperatorConvertToText={targetValueOperatorConvertToText}
                                          logout={logout}/>}/>
                <Route path={"/admin/roles"}
                       element={<RoleGalleryAdmin kpiOwners={kpiOwners} deleteKpiOwnerById={deleteKpiOwnerById}/>}/>
                <Route path={"/admin/change/:id"}
                       element={<ChangeKpiAdmin kpis={kpis} kpiOwners={kpiOwners} updateKpiById={updateKpiById}/>}/>
                <Route path={"/my-kpi"}
                       element={<MyKpi kpis={kpis} kpiOwners={kpiOwners} addNewKpi={addNewKpi}
                                       deleteKpiById={deleteKpiById} addNewKpiOwner={addNewKpiOwner}
                                       addNewUser={addNewUser} loggedInUserDetails={loggedInUserDetails} logout={logout}
                                       targetValueUnitConvertToText={targetValueUnitConvertToText}
                                       targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/my-kpi/change/:id"}
                       element={<ChangeKpiUser kpis={kpis} updateKpiById={updateKpiById}
                                               targetValueUnitConvertToText={targetValueUnitConvertToText}
                                               targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/"}
                       element={<LoginPage login={login} loggedInUserDetails={loggedInUserDetails}/>}/>
                <Route path={"/welcome"}
                       element={<WelcomePage loggedInUserDetails={loggedInUserDetails}/>}/>
            </Routes>
        </>
    )
}
