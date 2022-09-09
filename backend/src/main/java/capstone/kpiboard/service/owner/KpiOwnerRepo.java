package capstone.kpiboard.service.owner;

import capstone.kpiboard.model.roles.KpiOwner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface KpiOwnerRepo extends MongoRepository<KpiOwner, String> {
}
