package capstone.kpiboard.controller;

import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.role.NewRole;
import capstone.kpiboard.model.role.Role;
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
    public Role addNewRole(@RequestBody NewRole newRole) {
        return roleService.addNewRole(newRole);
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }

    @DeleteMapping("/roles/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRoleById(@PathVariable String id) throws RoleNotFoundException {
        roleService.deleteRoleById(id);
    }
}
