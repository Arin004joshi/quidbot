export type PriceNodeMetadata = {
    asset: string,
    price: number,
}

export type TimerNodeMetadata = {
    time: number
}

export const AVAILABLE_ASSETS = ['SOL', 'BTC', 'ETH']

export type TradingMetadata = {
    type: 'LONG' | 'SHORT',
    quantity: number,
    asset: typeof AVAILABLE_ASSETS
}