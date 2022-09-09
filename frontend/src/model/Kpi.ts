import {TargetForKpi} from "./TargetForKpi";
import {MonthValuePair} from "./MonthValuePair";

export type Kpi = {
    id: string,
    name: string,
    ownedBy: string
    values: MonthValuePair[],
    targetForKpi: TargetForKpi,
    currentAverageValue: number,
}


export type NewKpi = {
    name: string,
    ownedBy: string,
    targetForKpi: TargetForKpi,
}
