import { Handle, Position } from "@xyflow/react"
import type { TradingMetadata } from "common/types"

const Hyperliquid = ({ data, isConnectable, ...rest }: {
    data: {
        metadata: TradingMetadata
    },
    isConnectable: boolean
}) => {
    return (
        <div className="p-3 border border-border bg-card rounded-xl shadow-md w-48" {...rest}>
            <div className="text-sm font-bold bg-secondary text-secondary-foreground p-1 rounded-t-lg -mx-3 -mt-3 mb-2 text-center">
                Hyperliquid (Action)
            </div>
            <div className="flex justify-between items-center text-md font-semibold mb-1">
                <span className={data.metadata.type === 'LONG' ? 'text-green-500' : 'text-destructive'}>
                    {data.metadata.type}
                </span>
                <span className="text-foreground/90">
                    {data.metadata.asset}
                </span>
            </div>
            <div className="text-sm text-muted-foreground">
                Quantity: <span className="font-mono text-foreground">{data.metadata.quantity}</span>
            </div>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} className='bg-secondary' />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} className='bg-secondary' />
        </div>
    )
}

export default Hyperliquid