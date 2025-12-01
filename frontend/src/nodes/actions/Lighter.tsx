import { AVAILABLE_ASSETS } from "@/components/TriggerSheet"
import { Handle, Position } from "@xyflow/react"

export type TradingMetadata = {
    type: 'LONG' | 'SHORT',
    quantity: number,
    asset: typeof AVAILABLE_ASSETS
}


const Lighter = ({ data, isConnectable }: {
    data: {
        metadata: TradingMetadata
    },
    isConnectable: boolean
}) => {
    return (
        <div className="p-4 border">
            Backpack
            <div>{data.metadata.type}</div>
            <div>{data.metadata.quantity}</div>
            <div>{data.metadata.asset}</div>
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

export default Lighter
