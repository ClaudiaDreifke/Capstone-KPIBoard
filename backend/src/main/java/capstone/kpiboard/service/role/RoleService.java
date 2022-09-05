package capstone.kpiboard.service.role;

import capstone.kpiboard.exceptions.KpiNotFoundException;
import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.role.NewRole;
import capstone.kpiboard.model.role.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepo roleRepo;

    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    public Role addNewRole(NewRole newRole) {
        return roleRepo.save(newRole.withRandomId());
    }

    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }


    public void deleteRoleById(String id) throws RoleNotFoundException {
        if (roleRepo.existsById(id)) {
            roleRepo.deleteById(id);
        } else throw new KpiNotFoundException(id);
    }
}


