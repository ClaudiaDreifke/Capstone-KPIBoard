package capstone.kpiboard.controller;

import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.roles.KpiOwner;
import capstone.kpiboard.model.roles.NewKpiOwner;
import capstone.kpiboard.service.owner.KpiOwnerService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class KpiOwnerController {

    private final KpiOwnerService kpiOwnerService;

    public KpiOwnerController(KpiOwnerService kpiOwnerService) {
        this.kpiOwnerService = kpiOwnerService;
    }

    @PostMapping("/roles")
    @ResponseStatus(code = HttpStatus.CREATED)
    public KpiOwner addNewKpiOwner(@RequestBody NewKpiOwner newKpiOwner) {
        return kpiOwnerService.addNewKpiOwner(newKpiOwner);
    }

    @GetMapping("/roles")
    public List<KpiOwner> getAllKpiOwners() {
        return kpiOwnerService.getAllKpiOwner();
    }

    @DeleteMapping("/roles/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteKpiOwnerById(@PathVariable String id) throws RoleNotFoundException {
        kpiOwnerService.deleteKpiOwnerById(id);
    }
}
