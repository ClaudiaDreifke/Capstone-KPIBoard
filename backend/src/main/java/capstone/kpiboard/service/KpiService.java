package capstone.kpiboard.service;

import capstone.kpiboard.exceptions.KpiNotFoundException;
import capstone.kpiboard.model.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
            return kpiRepo.save(new Kpi(updatedKpi.id(), updatedKpi.name(), updatedKpi.values(), compareValuesWithTarget(updatedKpi), new TargetForKpi(
                    updatedKpi.targetForKpi().targetValueOperator(), updatedKpi.targetForKpi().targetValue(), updatedKpi.targetForKpi().targetValueUnit())));
        } else throw new KpiNotFoundException(updatedKpi.id());
    }

    public List<ComparedMonthValuePair> compareValuesWithTarget(Kpi kpiToCompare) {
        double actualTargetValue = kpiToCompare.targetForKpi().targetValue();
        String actualTargetValueOperator = kpiToCompare.targetForKpi().targetValueOperator().toString();

        List<MonthValuePair> listToCompare = kpiToCompare.values();
        List<ComparedMonthValuePair> comparedValues = new ArrayList<>();

        listToCompare.forEach(v -> {
                    if (actualTargetValueOperator.equals("GREATER") && v.value() > actualTargetValue) {
                        comparedValues.add(new ComparedMonthValuePair(v.month(), 1));
                    } else if (actualTargetValueOperator.equals("GREATER") && v.value() < actualTargetValue) {
                        comparedValues.add(new ComparedMonthValuePair(v.month(), 0));
                    } else if (actualTargetValueOperator.equals("LESS") && v.value() < actualTargetValue) {
                        comparedValues.add(new ComparedMonthValuePair(v.month(), 1));
                    } else if (actualTargetValueOperator.equals("LESS") && v.value() > actualTargetValue) {
                        comparedValues.add(new ComparedMonthValuePair(v.month(), 0));
                    } else if (actualTargetValueOperator.equals("EQUALS") && v.value() == actualTargetValue) {
                        comparedValues.add(new ComparedMonthValuePair(v.month(), 1));
                    } else {
                        comparedValues.add(new ComparedMonthValuePair(v.month(), 0));
                    }
                }
        );
        return comparedValues;
    }
}
