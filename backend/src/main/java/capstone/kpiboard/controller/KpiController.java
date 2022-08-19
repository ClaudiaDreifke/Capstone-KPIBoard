package capstone.kpiboard.controller;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiService;
import capstone.kpiboard.model.NewKpi;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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



}
