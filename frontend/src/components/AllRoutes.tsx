import {Route, Routes} from "react-router-dom";
import KpiBoard from "./KpiBoard";
import KpiGalleryAdmin from "./KpiGalleryAdmin";
import KpiGalleryUser from "./KpiGalleryUser";

export default function AllRoutes() {

    return (
        <>
            <Routes>
                <Route path={"/kpi-board"} element={<KpiBoard/>}/>
                <Route path={"/admin"} element={<KpiGalleryAdmin/>}/>
                <Route path={"my-Kpi"} element={<KpiGalleryUser/>}/>
            </Routes>
        </>
    )
}
