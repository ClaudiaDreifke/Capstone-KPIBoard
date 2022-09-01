import {Route, Routes} from "react-router-dom";
import KpiGalleryAdmin from "../admin/KpiGalleryAdmin";
import ChangeKpiAdmin from "../admin/ChangeKpiAdmin";
import useKpi from "../../hooks/useKpi";
import KpiGalleryUser from "../user/KpiGalleryUser";
import ChangeKpiUser from "../user/ChangeKpiUser";
import KpiBoard from "../board/KpiBoard";


export default function AllRoutes() {

    const {kpis, addNewKpi, deleteKpiById, updateKpiById} = useKpi();

    return (
        <>
            <Routes>
                <Route path={"/"}
                       element={<KpiBoard kpis={kpis}/>}/>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} addNewKpi={addNewKpi} deleteKpiById={deleteKpiById}/>}/>
                <Route path={"/admin/change/:id"}
                       element={<ChangeKpiAdmin kpis={kpis} updateKpiById={updateKpiById}/>}/>
                <Route path={"/my-kpi"}
                       element={<KpiGalleryUser kpis={kpis}/>}/>
                <Route path={"/my-kpi/change/:id"}
                       element={<ChangeKpiUser kpis={kpis} updateKpiById={updateKpiById}/>}/>
            </Routes>
        </>
    )
}
