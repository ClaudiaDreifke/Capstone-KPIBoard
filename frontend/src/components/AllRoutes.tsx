import {Route, Routes} from "react-router-dom";
import KpiGalleryAdmin from "./KpiGalleryAdmin";
import useKpi from "../hooks/useKpi";
import ChangeKpiAdmin from "./ChangeKpiAdmin";

export default function AllRoutes() {

    const {kpis, addNewKpi, deleteKpiById, updateKpiById} = useKpi();

    return (
        <>
            <Routes>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} addNewKpi={addNewKpi} deleteKpiById={deleteKpiById}
                                                 updateKpiById={updateKpiById}/>}/>
                <Route path={"/admin/change/:id"}
                       element={<ChangeKpiAdmin kpis={kpis} updateKpiById={updateKpiById}/>}/>
            </Routes>
        </>
    )
}
