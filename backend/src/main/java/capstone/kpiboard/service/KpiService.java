package capstone.kpiboard.service;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.NewKpi;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class KpiService {

    private final KpiRepo kpiRepo;

    public KpiService(KpiRepo kpiRepo) {
        this.kpiRepo = kpiRepo;
    }

    public Kpi addNewKpi(NewKpi newKpi) {
        return kpiRepo.save(newKpi.withValueListAndId());
    }

    public List<Kpi> getAllKpis() {
        return kpiRepo.findAll();
    }

    public void deleteKpi(String id) {
        boolean doesKpiExist = kpiRepo.existsById(id);
        if (doesKpiExist) {
            kpiRepo.deleteById(id);
        } else throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Keine Kennzahl mit id " + id + " gefunden");
    }
}
