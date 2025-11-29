import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, type NodeChange, type EdgeChange } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TriggerSheet from './TriggerSheet';
import Timer from '@/nodes/triggers/Timer';
import Price from '@/nodes/triggers/Price';

export type NodeKind = 'timer-trigger' | 'price-trigger' | 'hyperliquid' | 'backpack' | 'lighter'

export type NodeMetadata = any
interface NodeType {
    data: {
        type: 'trigger' | 'action',
        kind: NodeKind,
        metadata: NodeMetadata,
        label: string,
    },
    id: string,
    position: { x: number, y: number }
}

const nodetypes = {
    "timer-trigger": Timer,
    "price-trigger": Price
}

interface EdgeType {
    id: string, source: string, target: string
}

const CreateWorkflow = () => {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<EdgeType[]>([]);

    const onNodesChange = useCallback(
        (changes: NodeChange<NodeType>[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<EdgeType>[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            {JSON.stringify(nodes)}
            {!nodes.length && (
                <TriggerSheet
                    onSelect={(kind, metadata) => {
                        setNodes(prev => [
                            ...prev,
                            {
                                id: Math.random().toString(),
                                type: kind,
                                data: {
                                    type: "trigger",
                                    kind,
                                    metadata,
                                    label: kind,
                                },
                                position: { x: 0, y: 0 }
                            }
                        ]);
                    }}
                />
            )}

            <ReactFlow
                nodeTypes={nodetypes}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            />
        </div>
    );
}

export default CreateWorkflow
