export type Kpi = {
    name: string,
    values: number[],
    targetValue: number,
    targetValueOperator: string
}


export type NewKpi = Omit<Kpi, "values">;
