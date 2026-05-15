import { db } from '@/lib/db'

export const CLEANING_FEE = 60

export async function resolveNightlyRate(rvId: string, checkIn: Date, checkOut: Date): Promise<number> {
  const rules = await db.rVPriceRule.findMany({
    where: {
      rvId,
      active: true,
      startDate: { lte: checkIn },
      endDate:   { gte: checkOut },
    },
    orderBy: { startDate: 'desc' },
  })
  if (rules.length === 0) return 0
  return Number(rules[0].nightlyRate)
}

export function calcNights(checkIn: Date, checkOut: Date): number {
  return Math.round((checkOut.getTime() - checkIn.getTime()) / 86_400_000)
}

export async function resolveAddOnPrice(addOnId: string, checkIn: Date): Promise<number> {
  const rule = await db.addOnPriceRule.findFirst({
    where: {
      addOnId,
      active: true,
      startDate: { lte: checkIn },
      endDate:   { gte: checkIn },
    },
    orderBy: { startDate: 'desc' },
  })
  return rule ? Number(rule.price) : 0
}
