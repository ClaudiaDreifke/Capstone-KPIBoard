package capstone.kpiboard.service.role;

import capstone.kpiboard.model.role.UserRole;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepo extends MongoRepository<UserRole, String> {
}
