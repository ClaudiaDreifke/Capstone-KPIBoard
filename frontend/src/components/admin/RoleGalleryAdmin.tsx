import {UserRole} from "../../model/Role";
import '../../styling/RoleGalleryAdmin.css'
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

type RoleGalleryAdminProps = {
    userRoles: UserRole[],
    deleteUserRoleById: (id: string) => Promise<void>;
}

export default function RoleGalleryAdmin(props: RoleGalleryAdminProps) {

    const navigate = useNavigate();

    const handleRoleDeleteOnClick = (id: string) => {
        props.deleteUserRoleById(id).catch(() => {
            toast.error("Die Kennzahl konnte nicht gelöscht werden!")
        });
    }

    return (
        <div className={"role-list"}>
            <h3>verfügbare Rollen</h3>
            <ul>{props.userRoles.map((role =>
                    <li style={{listStyleType: "none", fontSize: "medium", marginBottom: 10}} key={role.id}>
                        <span>Rolle: {role.roleName}</span>
                        <DeleteIcon sx={{fontSize: 17}}
                                    onClick={_event => handleRoleDeleteOnClick(role.id)}/>
                    </li>
            ))}
            </ul>
            <button style={{maxWidth: 150}} onClick={() => navigate("/admin/")}>zurück</button>
        </div>
    )
}
