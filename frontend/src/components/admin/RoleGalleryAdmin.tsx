import {Role} from "../../model/Role";
import '../../styling/RoleGalleryAdmin.css'
import DeleteIcon from "@mui/icons-material/Delete";
import {toast} from "react-toastify";


type RoleGalleryAdminProps = {
    roles: Role[],
    deleteRoleById: (id: string) => Promise<void>;
}

export default function RoleGalleryAdmin(props: RoleGalleryAdminProps) {

    const handleRoleDeleteOnClick = (id: string) => {
        props.deleteRoleById(id).catch(() => {
            toast.error("Die Kennzahl konnte nicht gelöscht werden!")
        });
    }

    return (
        <div className={"role-list"}>
            <h3>verfügbare Rollen</h3>
            <ul>{props.roles.map((role =>
                    <li style={{listStyleType: "none", fontSize: "medium", marginBottom: 10}} key={role.id}>
                        <span>Rolle: {role.roleName}</span>
                        <DeleteIcon sx={{fontSize: 17}}
                                    onClick={_event => handleRoleDeleteOnClick(role.id)}/>
                    </li>
            ))}
            </ul>
        </div>
    )
}