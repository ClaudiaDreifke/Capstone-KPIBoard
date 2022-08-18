package capstone.kpiboard.model;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class KpiService {

    private final KpiRepo kpiRepo;

    public KpiService(KpiRepo kpiRepo) {
        this.kpiRepo = kpiRepo;
    }

    public Kpi getKpiByType(KpiType kpiType) {
         return kpiRepo.findById(kpiType).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
