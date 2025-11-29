import { Handle, Position } from '@xyflow/react'

export type TimerNodeMetadata = {
    time: number
}

const Timer = ({ data, isConnectable }: {
    data: {
        metadata: TimerNodeMetadata
    },
    isConnectable: boolean
}) => {
    return (
        <div className='p-4 border'>
            Every {data.metadata.time / 3600} seconds
            <Handle type='source' position={Position.Right} />
        </div>
    )
}
export default Timer 
