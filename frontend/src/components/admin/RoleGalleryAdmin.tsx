import {Role} from "../../model/Role";
import '../../styling/RoleGalleryAdmin.css'


type RoleGalleryAdminProps = {
    roles: Role[],
}

export default function RoleGalleryAdmin(props: RoleGalleryAdminProps) {

    return (
        <div className={"role-list"}>
            <h3>verfügbare Rollen</h3>
            <ul>{props.roles.map((role =>
                    <li style={{listStyleType: "none", fontSize: "medium", marginBottom: 10}} key={role.id}>
                        <span>Rolle: {role.roleName}</span>
                    </li>
            ))
            }
            </ul>
        </div>
    )
}