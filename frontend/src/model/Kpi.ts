import {TargetForKpi} from "./TargetForKpi";
import {Value} from "./Value";

export type Kpi = {
    id: string,
    name: string,
    values: Value[],
    targetForKpi: TargetForKpi,
}


export type NewKpi = {
    name: string,
    targetForKpi: TargetForKpi,
};
