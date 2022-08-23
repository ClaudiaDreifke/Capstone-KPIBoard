import {TargetForKpi} from "./TargetForKpi";

export type Kpi = {
    id: string,
    name: string,
    values: number[],
    targetForKpi: TargetForKpi,
}


export type NewKpi = {
    name: string,
    targetForKpi: TargetForKpi,
};
