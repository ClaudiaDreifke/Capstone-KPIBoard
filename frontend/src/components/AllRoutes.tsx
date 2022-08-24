import {Route, Routes} from "react-router-dom";
import KpiBoard from "./KpiBoard";
import KpiGalleryAdmin from "./KpiGalleryAdmin";
import KpiGalleryUser from "./KpiGalleryUser";
import useKpi from "../hooks/useKpi";

export default function AllRoutes() {

    const {kpis, addNewKpi, deleteKpiById} = useKpi();

    return (
        <>
            <Routes>
                <Route path={"/kpi-board"} element={<KpiBoard/>}/>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} addNewKpi={addNewKpi} deleteKpiById={deleteKpiById}/>}/>
                <Route path={"my-Kpi"} element={<KpiGalleryUser/>}/>
            </Routes>
        </>
    )
}
