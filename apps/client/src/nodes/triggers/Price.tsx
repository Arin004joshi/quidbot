import { Handle, Position } from "@xyflow/react"

export type PriceNodeMetadata = {
    asset: string,
    price: number,
}

const Price = ({ data, isConnectable }: {
    data: {
        metadata: PriceNodeMetadata
    },
    isConnectable: boolean
}) => {
    return (
        <div className="p-4 border-2 border-accent bg-accent/10 rounded-xl shadow-lg w-48">
            <div className="font-semibold text-lg text-primary mb-1">
                Price Trigger
            </div>
            <div className='text-sm text-foreground/80'>
                If <span className="font-bold text-primary">{data.metadata.asset}</span> changes by <span className="font-bold text-primary">{data.metadata.price}</span> units
            </div>
            <Handle type="source" position={Position.Right} className='bg-accent' />
        </div>
    )
}

export default Price