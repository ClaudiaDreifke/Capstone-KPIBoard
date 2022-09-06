import {Kpi, NewKpi} from "../../model/Kpi";
import SingleKpiAdmin from "./SingleKpiAdmin";
import '../../styling/KpiGalleryAdmin.css'
import AddKpi from "./AddKpi";
import AddRole from "./AddRole";
import {NewRole} from "../../model/Role";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";


type KpiGalleryAdminProps = {
    kpis: Kpi[],
    deleteKpiById: (id: string) => Promise<void>;
    addNewKpi: (newKpi: NewKpi) => Promise<void>;
    addNewRole: (newRole: NewRole) => Promise<void>;
    targetValueUnitConvertToText: (stringToConvert: string) => string;
    targetValueOperatorConvertToText: (stringToConvert: string) => string;
}

export default function KpiGalleryAdmin(props: KpiGalleryAdminProps) {

    const navigate = useNavigate();

    const [addRoleIsOpen, setAddRoleIsOpen] = useState(false);
    const [addKpiIsOpen, setAddKpiIsOpen] = useState(false);

    const toggleAddRole = () => {
        setAddRoleIsOpen(!addRoleIsOpen);
    }

    const handleAddRoleClose = () => {
        setAddRoleIsOpen(false);
    };

    const toggleAddKpi = () => {
        setAddKpiIsOpen(!addKpiIsOpen);
    }

    const handleAddKpiClose = () => {
        setAddKpiIsOpen(false);
    };

    return (
        <div className={"kpi-gallery-admin"}>
            <button className={"button-admin-view"} onClick={toggleAddRole}> + Rolle hinzufügen</button>
            <Dialog open={addRoleIsOpen} onClose={handleAddRoleClose}>
                <DialogTitle>Rolle hinzufügen</DialogTitle>
                <DialogContent>
                    <AddRole addNewRole={props.addNewRole}/>
                    <button style={{maxWidth: 100, margin: 30}} onClick={handleAddRoleClose}>zurück</button>
                </DialogContent>
            </Dialog>
            <button className={"button-admin-view"} onClick={() => navigate("/admin/roles")}> Rollen bearbeiten</button>
            <img src={"pictures/User.png"} className={"Role-Logo"} alt={""}/>
            <button className={"button-admin-view"}> + User hinzufügen</button>
            <button className={"button-admin-view"}> User bearbeiten</button>

            <button className={"button-admin-view"} onClick={toggleAddKpi}> + Kennzahl hinzufügen</button>
            <Dialog open={addKpiIsOpen} onClose={handleAddKpiClose}>
                <DialogTitle>Kennzahl hinzufügen</DialogTitle>
                <DialogContent>
                    <AddKpi addNewKpi={props.addNewKpi}/>
                    <button style={{maxWidth: 100, marginBottom: 20}} onClick={handleAddKpiClose}>zurück</button>
                </DialogContent>
            </Dialog>
            <ul className={"kpi-gallery-view"}>
                <h3 className={"headline"}> Kennzahlen-Übersicht</h3>
                {props.kpis.map(kpi => <SingleKpiAdmin key={kpi.id}
                                                       kpi={kpi}
                                                       deleteKpiById={props.deleteKpiById}
                                                       targetValueUnitConvertToText={props.targetValueUnitConvertToText}
                                                       targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}/>
                )}
            </ul>
        </div>
    )
}
