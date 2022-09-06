package capstone.kpiboard.service.role;

import capstone.kpiboard.model.role.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepo extends MongoRepository<Role, String> {
}
