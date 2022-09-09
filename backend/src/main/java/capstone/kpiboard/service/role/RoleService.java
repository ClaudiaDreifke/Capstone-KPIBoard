package capstone.kpiboard.service.role;

import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.role.NewUserRole;
import capstone.kpiboard.model.role.UserRole;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepo roleRepo;

    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    public UserRole addNewRole(NewUserRole newUserRole) {
        return roleRepo.save(newUserRole.withRandomId());
    }

    public List<UserRole> getAllRoles() {
        return roleRepo.findAll();
    }

    public void deleteRoleById(String id) throws RoleNotFoundException {
        if (roleRepo.existsById(id)) {
            roleRepo.deleteById(id);
        } else throw new RoleNotFoundException(id);
    }
}
