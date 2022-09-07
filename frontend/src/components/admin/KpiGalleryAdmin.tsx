import {Kpi, NewKpi} from "../../model/Kpi";
import SingleKpiAdmin from "./SingleKpiAdmin";
import '../../styling/KpiGalleryAdmin.css'
import AddKpi from "./AddKpi";
import AddRole from "./AddRole";
import {NewRole, Role} from "../../model/Role";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";


type KpiGalleryAdminProps = {
    kpis: Kpi[],
    roles: Role[],
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
        <>
            <div className={"kpi-gallery-add-section"}>
                <img src={"pictures/User-Face.png"} className={"user-logo"} alt={""} height={90}/>
                <button className={"button-admin-add-user-1"}> + User hinzufügen</button>
                <Dialog open={addKpiIsOpen} onClose={handleAddKpiClose}>
                    <button style={{
                        width: 20,
                        backgroundColor: "white",
                        borderColor: "white",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "large",
                        marginLeft: 350,
                    }} onClick={handleAddKpiClose}>X
                    </button>
                    <DialogTitle>Kennzahl hinzufügen</DialogTitle>
                    <DialogContent>
                        <AddKpi addNewKpi={props.addNewKpi} roles={props.roles}/>
                    </DialogContent>
                </Dialog>
                <button className={"button-admin-add-user-2"}> User bearbeiten</button>
                <button className={"button-admin-add-role-1"} onClick={toggleAddRole}> + Rolle hinzufügen</button>
                <Dialog open={addRoleIsOpen} onClose={handleAddRoleClose}>
                    <button style={{
                        width: 20,
                        backgroundColor: "white",
                        borderColor: "white",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "large",
                        marginLeft: 450,
                    }} onClick={handleAddRoleClose}>X
                    </button>
                    <DialogTitle>Rolle hinzufügen</DialogTitle>
                    <DialogContent>
                        <AddRole addNewRole={props.addNewRole}/>
                    </DialogContent>
                </Dialog>
                <button className={"button-admin-add-role-2"} onClick={() => navigate("/admin/roles")}> Rollen
                    bearbeiten
                </button>
                <img src={"pictures/Role-Face.png"} className={"role-logo"} alt={""} height={90}/>
            </div>
            <ul className={"kpi-gallery-view"}>
                <h2 className={"headline"}> Kennzahlen-Übersicht</h2>
                <button className={"button-add-kpi"} onClick={toggleAddKpi}> + Kennzahl hinzufügen</button>
                {props.kpis.map(kpi => <SingleKpiAdmin key={kpi.id}
                                                       kpi={kpi}
                                                       deleteKpiById={props.deleteKpiById}
                                                       targetValueUnitConvertToText={props.targetValueUnitConvertToText}
                                                       targetValueOperatorConvertToText={props.targetValueOperatorConvertToText}/>
                )}
            </ul>
        </>
    )
}
