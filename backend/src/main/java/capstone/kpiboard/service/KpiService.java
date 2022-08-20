package capstone.kpiboard.service;

import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.NewKpi;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KpiService {

    private final KpiRepo kpiRepo;

    public KpiService(KpiRepo kpiRepo) {
        this.kpiRepo = kpiRepo;
    }

    public Kpi addNewKpi(NewKpi newKpi) {
        return kpiRepo.save(newKpi.withValueList());
    }

    public List<Kpi> getAllKpiAdmin() {
        return kpiRepo.findAll();
    }

}
