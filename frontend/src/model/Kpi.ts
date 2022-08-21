import {TargetForKpi} from "./TargetForKpi";

export type Kpi = {
    name: string,
    values: number[],
    targetForKpi: TargetForKpi,
}


export type NewKpi = Omit<Kpi, "values">;
