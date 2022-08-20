package capstone.kpiboard.controller;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.NewKpi;
import capstone.kpiboard.service.KpiService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class KpiController {
    private final KpiService kpiService;

    public KpiController(KpiService kpiService) {
        this.kpiService = kpiService;
    }

    @PostMapping("/admin/add-kpi")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Kpi addNewKpi(@RequestBody NewKpi newKpi) {
        return kpiService.addNewKpi(newKpi);
    }

    @GetMapping("/admin/all-kpi")
    public List<Kpi> getAllKpisAdmin() {
        return kpiService.getAllKpisAdmin();
    }


}
