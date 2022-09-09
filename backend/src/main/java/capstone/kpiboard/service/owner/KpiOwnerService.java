package capstone.kpiboard.service.owner;

import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.roles.KpiOwner;
import capstone.kpiboard.model.roles.NewKpiOwner;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KpiOwnerService {

    private final KpiOwnerRepo kpiOwnerRepo;

    public KpiOwnerService(KpiOwnerRepo kpiOwnerRepo) {
        this.kpiOwnerRepo = kpiOwnerRepo;
    }

    public KpiOwner addNewKpiOwner(NewKpiOwner newKpiOwner) {
        return kpiOwnerRepo.save(newKpiOwner.withRandomId());
    }

    public List<KpiOwner> getAllKpiOwner() {
        return kpiOwnerRepo.findAll();
    }

    public void deleteKpiOwnerById(String id) throws RoleNotFoundException {
        if (kpiOwnerRepo.existsById(id)) {
            kpiOwnerRepo.deleteById(id);
        } else throw new RoleNotFoundException(id);
    }
}
