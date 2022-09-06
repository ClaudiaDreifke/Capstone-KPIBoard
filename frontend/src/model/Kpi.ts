import {TargetForKpi} from "./TargetForKpi";
import {MonthValuePair} from "./MonthValuePair";

export type Kpi = {
    id: string,
    name: string,
    responsibleRole: string
    values: MonthValuePair[],
    targetForKpi: TargetForKpi,
    currentAverageValue: number,
}


export type NewKpi = {
    name: string,
    responsibleRole: string,
    targetForKpi: TargetForKpi,
}
