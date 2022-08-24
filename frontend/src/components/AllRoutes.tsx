import {Route, Routes} from "react-router-dom";
import KpiGalleryAdmin from "./KpiGalleryAdmin";
import useKpi from "../hooks/useKpi";

export default function AllRoutes() {

    const {kpis, addNewKpi, deleteKpiById} = useKpi();

    return (
        <>
            <Routes>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} addNewKpi={addNewKpi} deleteKpiById={deleteKpiById}/>}/>
            </Routes>
        </>
    )
}
