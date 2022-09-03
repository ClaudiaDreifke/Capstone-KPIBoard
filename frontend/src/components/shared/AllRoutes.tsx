import {Route, Routes} from "react-router-dom";
import KpiGalleryAdmin from "../admin/KpiGalleryAdmin";
import ChangeKpiAdmin from "../admin/ChangeKpiAdmin";
import useKpi from "../../hooks/useKpi";
import KpiGalleryUser from "../user/KpiGalleryUser";
import ChangeKpiUser from "../user/ChangeKpiUser";
import KpiBoard from "../board/KpiBoard";


export default function AllRoutes() {

    const {
        kpis,
        addNewKpi,
        deleteKpiById,
        updateKpiById,
        targetValueUnitConvertToText,
        targetValueOperatorConvertToText
    } = useKpi();

    return (
        <>
            <Routes>
                <Route path={"/"}
                       element={<KpiBoard kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                          targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/admin"}
                       element={<KpiGalleryAdmin kpis={kpis} addNewKpi={addNewKpi} deleteKpiById={deleteKpiById}
                                                 targetValueUnitConvertToText={targetValueUnitConvertToText}
                                                 targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/admin/change/:id"}
                       element={<ChangeKpiAdmin kpis={kpis} updateKpiById={updateKpiById}/>}/>
                <Route path={"/my-kpi"}
                       element={<KpiGalleryUser kpis={kpis} targetValueUnitConvertToText={targetValueUnitConvertToText}
                                                targetValueOperatorConvertToText={targetValueOperatorConvertToText}/>}/>
                <Route path={"/my-kpi/change/:id"}
                       element={<ChangeKpiUser kpis={kpis} updateKpiById={updateKpiById}/>}/>
            </Routes>
        </>
    )
}
