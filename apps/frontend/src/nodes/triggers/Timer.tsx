import { Handle, Position } from '@xyflow/react'



const Timer = ({ data, isConnectable }: {
    data: {
        metadata: TimerNodeMetadata
    },
    isConnectable: boolean
}) => {
    // Display time in hours for readability
    const timeInHours = (data.metadata.time / 3600).toFixed(2);
    
    return (
        <div className='p-4 border-2 border-primary bg-primary/10 rounded-xl shadow-lg w-48'>
            <div className="font-semibold text-lg text-primary mb-1">
                Schedule Trigger
            </div>
            <div className='text-sm text-foreground/80'>
                Every <span className="font-bold text-primary">{timeInHours}</span> hours
            </div>
            <Handle type='source' position={Position.Right} className='bg-primary' />
        </div>
    )
}
export default Timer