export type Kpi = {
    type: string,
    values: number[],
    targetValue: number,
    targetMathOperation: string
}

export type NewKpi = Omit<Kpi, "values">;