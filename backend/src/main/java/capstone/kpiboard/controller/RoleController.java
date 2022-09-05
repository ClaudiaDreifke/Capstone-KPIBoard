package capstone.kpiboard.controller;

import capstone.kpiboard.model.role.NewRole;
import capstone.kpiboard.model.role.Role;
import capstone.kpiboard.service.role.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Role addNewRole(@RequestBody NewRole newRole) {
        return roleService.addNewRole(newRole);
    }

    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
}
