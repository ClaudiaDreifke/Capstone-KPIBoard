import {TargetForKpi} from "./TargetForKpi";
import {MonthValuePair} from "./MonthValuePair";
import {ComparedMonthValuePair} from "./ComparedMonthValuePair";

export type Kpi = {
    id: string,
    name: string,
    values: MonthValuePair[],
    comparedValues: ComparedMonthValuePair[],
    targetForKpi: TargetForKpi,
}


export type NewKpi = {
    name: string,
    targetForKpi: TargetForKpi,
};
