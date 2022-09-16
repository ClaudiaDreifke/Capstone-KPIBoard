package capstone.kpiboard;

import capstone.kpiboard.exceptions.RoleNotFoundException;
import capstone.kpiboard.model.roles.KpiOwner;
import capstone.kpiboard.model.roles.NewKpiOwner;
import capstone.kpiboard.service.owner.KpiOwnerRepo;
import capstone.kpiboard.service.owner.KpiOwnerService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@Slf4j
@Service
class KpiOwnerServiceTest {

    private final KpiOwnerRepo testKpiOwnerRepo = mock(KpiOwnerRepo.class);
    private final KpiOwnerService testKpiOwnerService = new KpiOwnerService(testKpiOwnerRepo);

    ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    Validator validator = factory.getValidator();

    @Test
    void addNewKpiOwnerTest() {
        //given
        NewKpiOwner newTestRole = new NewKpiOwner("Leiter Truckings");
        KpiOwner testRole = new KpiOwner("12345", "Leiter Truckings");
        when(testKpiOwnerRepo.save(any(KpiOwner.class))).thenReturn(testRole);
        //when
        KpiOwner actual = testKpiOwnerService.addNewKpiOwner(newTestRole);
        //then
        Assertions.assertEquals(testRole, actual);
    }

    @Test
    void addNewKpiOwnerFailsWhenValidationFails() {
        //given
        NewKpiOwner newFailRole = new NewKpiOwner(null);

        //when
        Set<ConstraintViolation<NewKpiOwner>> violations = validator.validate(newFailRole);
        log.info(violations.stream().map(v -> v.getPropertyPath() + ": " + v.getInvalidValue() + ": " + v.getMessage())
                .collect(Collectors.joining("\n")));
        //then
        assertFalse(violations.isEmpty());
    }

    @Test
    void getAllKpiOwnerTest() {
        //given
        List<KpiOwner> testList = List.of(
                new KpiOwner("12345", "Leiter Truckings"),
                new KpiOwner("12367", "Leiter Personal"));
        when(testKpiOwnerRepo.findAll()).thenReturn(testList);
        //when
        List<KpiOwner> actual = testKpiOwnerService.getAllKpiOwner();
        //then
        Assertions.assertEquals(testList, actual);
    }

    @Test
    void deleteKpiOwnerByIdIfExistsTest() {
        //given
        when(testKpiOwnerRepo.existsById("12345")).thenReturn(true);
        doNothing().when(testKpiOwnerRepo).deleteById("12345");
        //when
        testKpiOwnerService.deleteKpiOwnerById("12345");
        //then
        verify(testKpiOwnerRepo).deleteById("12345");
    }

    @Test
    void deleteKpiOwnerByIdIfDoesntExistTest() {
        //given
        when(testKpiOwnerRepo.existsById("123")).thenReturn(false);
        doNothing().when(testKpiOwnerRepo).deleteById("123");
        //then
        Assertions.assertThrows(RoleNotFoundException.class, () -> testKpiOwnerService.deleteKpiOwnerById("123"));
    }
}
