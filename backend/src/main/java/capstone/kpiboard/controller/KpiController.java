package capstone.kpiboard.controller;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.KpiService;
import capstone.kpiboard.model.KpiType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class KpiController {

    private final KpiService kpiService;

    public KpiController(KpiService kpiService) {
        this.kpiService = kpiService;
    }


    @GetMapping("/my-kpi/{kpiType}")
    public Kpi getKpiByType(@PathVariable KpiType kpiType) {
       return kpiService.getKpiByType(kpiType);
    }

}
