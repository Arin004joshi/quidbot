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
        <div className="p-4 border">
            On every {data.metadata.price} {data.metadata.asset} fluctuations
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

export default Price
