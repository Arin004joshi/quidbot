import { AVAILABLE_ASSETS } from "@/components/TriggerSheet"
import { Handle, Position } from "@xyflow/react"

export type TradingMetadata = {
    type: 'LONG' | 'SHORT',
    quantity: number,
    asset: string
}


const Backpack = ({ data, isConnectable, ...rest }: {
    data: {
        metadata: TradingMetadata
    },
    isConnectable: boolean
}) => {
    return (
        <div className="p-4 border" {...rest}>
            Backpack
            <div>{data.metadata.type}</div>
            <div>{data.metadata.quantity}</div>
            <div>{data.metadata.asset}</div>
            <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
            <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
        </div>
    )
}

export default Backpack
