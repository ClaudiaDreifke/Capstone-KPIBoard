package capstone.kpiboard.model;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class KpiService {

    private final KpiRepo kpiRepo;

    public KpiService(KpiRepo kpiRepo) {
        this.kpiRepo = kpiRepo;
    }

    public List<Kpi> getAllMyKpi() {
        return kpiRepo.findAll();
    }
}
