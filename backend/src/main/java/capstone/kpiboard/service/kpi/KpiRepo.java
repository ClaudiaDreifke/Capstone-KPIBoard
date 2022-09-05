package capstone.kpiboard.service.kpi;


import capstone.kpiboard.model.kpi.Kpi;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface KpiRepo extends MongoRepository <Kpi, String>{
}
