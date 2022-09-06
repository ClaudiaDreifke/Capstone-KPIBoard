package capstone.kpiboard.service.kpi;

import capstone.kpiboard.exceptions.KpiNotFoundException;
import capstone.kpiboard.model.kpi.Kpi;
import capstone.kpiboard.model.kpi.MonthValuePair;
import capstone.kpiboard.model.kpi.NewKpi;
import capstone.kpiboard.model.kpi.TargetForKpi;
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
            return kpiRepo.save(new Kpi(
                    updatedKpi.id(),
                    updatedKpi.name(),
                    updatedKpi.responsibleRole(),
                    updatedKpi.values(),
                    new TargetForKpi(
                            updatedKpi.targetForKpi().targetValueOperator(),
                            updatedKpi.targetForKpi().targetValue(),
                            updatedKpi.targetForKpi().targetValueUnit()),
                    calculateCurrentAverageValue(updatedKpi)));
        } else throw new KpiNotFoundException(updatedKpi.id());
    }

    public double calculateCurrentAverageValue(Kpi updatedKpi) {
        return updatedKpi.values().stream()
                .mapToDouble(MonthValuePair::value)
                .average().orElse(0);
    }
}
