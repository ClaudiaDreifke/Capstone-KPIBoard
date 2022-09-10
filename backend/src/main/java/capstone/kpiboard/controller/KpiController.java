package capstone.kpiboard.controller;

import capstone.kpiboard.exceptions.KpiNotFoundException;
import capstone.kpiboard.model.kpi.Kpi;
import capstone.kpiboard.model.kpi.NewKpi;
import capstone.kpiboard.service.kpi.KpiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class KpiController {
    private final KpiService kpiService;

    @PostMapping("/kpis")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Kpi addNewKpi(@RequestBody NewKpi newKpi) {
        return kpiService.addNewKpi(newKpi);
    }

    @GetMapping("/kpis")
    public List<Kpi> getAllKpis() {
        return kpiService.getAllKpis();
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
