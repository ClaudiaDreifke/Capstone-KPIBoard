import {TargetForKpi} from "./TargetForKpi";
import {MonthValuePair} from "./MonthValuePair";

export type Kpi = {
    id: string,
    name: string,
    values: MonthValuePair[],
    targetForKpi: TargetForKpi,
}


export type NewKpi = {
    name: string,
    targetForKpi: TargetForKpi,
}
