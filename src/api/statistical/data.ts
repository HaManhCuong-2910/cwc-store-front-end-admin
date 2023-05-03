export interface TgetStatisticalAll {
  countOrders: number
  revenue_month: number
  revenue_years: number
  countAccounts: number
  countNews: number
  chartRevenue: TChartRevenue[]
}

export type TChartRevenue = {
  month: number
  revenue_month: number
}
