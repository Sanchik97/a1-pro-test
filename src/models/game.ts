export enum RealType {
  dog = 'DOG',
  ltc = 'LTC',
  usdt = 'USDT',
  btc = 'BTC',
  xrp = 'XRP',
  eth = 'ETH',
}

export interface IGame {
  id: string
  title: string
  provider: string
  collections: Record<string, number>
  real: Record<RealType, Record<'id', number>>
}
