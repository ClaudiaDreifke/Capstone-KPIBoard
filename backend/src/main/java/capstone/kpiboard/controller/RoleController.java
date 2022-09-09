package capstone.kpiboard.controller;

import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.role.NewUserRole;
import capstone.kpiboard.model.role.UserRole;
import capstone.kpiboard.service.role.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/roles")
    @ResponseStatus(code = HttpStatus.CREATED)
    public UserRole addNewRole(@RequestBody NewUserRole newUserRole) {
        return roleService.addNewRole(newUserRole);
    }

    @GetMapping("/roles")
    public List<UserRole> getAllRoles() {
        return roleService.getAllRoles();
    }

    @DeleteMapping("/roles/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoleById(@PathVariable String id) throws RoleNotFoundException {
        roleService.deleteRoleById(id);
    }
}
