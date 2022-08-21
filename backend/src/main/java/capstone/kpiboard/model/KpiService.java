package capstone.kpiboard.model;

import org.springframework.stereotype.Service;

@Service
public class KpiService {

    private final KpiRepo kpiRepo;

    public KpiService(KpiRepo kpiRepo) {
        this.kpiRepo = kpiRepo;
    }

    public Kpi addNewKpi(NewKpi newKpi) {
        return kpiRepo.save(newKpi.withValueListAndId());
    }
}
