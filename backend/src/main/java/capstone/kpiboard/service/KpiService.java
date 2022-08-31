package capstone.kpiboard.service;

import capstone.kpiboard.exceptions.KpiNotFoundException;
import capstone.kpiboard.model.Kpi;
import capstone.kpiboard.model.NewKpi;
import capstone.kpiboard.model.TargetForKpi;
import org.springframework.stereotype.Service;

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

    public void deleteKpiById(String id) throws KpiNotFoundException {
        if (kpiRepo.existsById(id)) {
            kpiRepo.deleteById(id);
        } else throw new KpiNotFoundException(id);
    }

    public Kpi updateKpiById(Kpi updatedKpi) {
        if (kpiRepo.existsById(updatedKpi.id())) {
            return kpiRepo.save(new Kpi(updatedKpi.id(), updatedKpi.name(), updatedKpi.values(), new TargetForKpi(
                    updatedKpi.targetForKpi().targetValueOperator(), updatedKpi.targetForKpi().targetValue(), updatedKpi.targetForKpi().targetValueUnit())));
        } else throw new KpiNotFoundException(updatedKpi.id());
    }
}
