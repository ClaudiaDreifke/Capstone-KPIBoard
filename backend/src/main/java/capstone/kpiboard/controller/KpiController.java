package capstone.kpiboard.controller;

import capstone.kpiboard.exceptions.KpiNotFoundException;
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

    @PostMapping("/kpis")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Kpi addNewKpi(@RequestBody NewKpi newKpi) {
        return kpiService.addNewKpi(newKpi);
    }

    @GetMapping("/kpis")
    public List<Kpi> getAllKpis() {
        return kpiService.getAllKpis();
    }

    @GetMapping("/kpis/{id}")
    public Kpi getKpiById(@PathVariable String id) {
        return kpiService.getKpiById(id);
    }

    @DeleteMapping("/kpis/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteKpiById(@PathVariable String id) throws KpiNotFoundException {
        kpiService.deleteKpiById(id);
    }

    @PutMapping("/kpis/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public Kpi updateKpiById(@PathVariable String id, @RequestBody Kpi updatedKpi) {
        return kpiService.updateKpiById(updatedKpi);
    }

}
