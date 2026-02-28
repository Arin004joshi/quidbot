import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

/**
 * Types for QuidBot Simulation
 * Matches the structure coming from your ReactFlow frontend
 */
interface WorkflowNode {
    id: string;
    type: string;
    data: {
        symbol?: string;
        threshold?: number;
        amount?: number;
        [key: string]: any;
    };
}

interface WorkflowEdge {
    id: string;
    source: string;
    target: string;
}

interface WorkflowPayload {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
}

/**
 * QuidBot Simulation Engine
 */

// 1. Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'QuidBot Simulation Engine is Online', version: '1.1.0' });
});

// 2. Market Data API
// Used by the Frontend to show live prices in your custom nodes
app.get('/api/market/price/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const response = await axios.post('https://api.hyperliquid.xyz/info', { type: 'allMids' });
        const price = response.data[symbol];

        if (!price) {
            return res.status(404).json({ error: `Symbol ${symbol} not found` });
        }

        res.json({
            symbol,
            price: parseFloat(price),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch market data' });
    }
});

// 3. Workflow Execution Engine
// This receives the JSON from ReactFlow and "walks" the graph
app.post('/api/workflow/execute', async (req: Request<{}, {}, WorkflowPayload>, res: Response) => {
    const { nodes, edges } = req.body;
    const logs: string[] = [];
    let context: any = {}; // Used to pass data between nodes (e.g., price from trigger to action)

    console.log("🚀 Starting Execution for QuidBot Workflow...");

    try {
        // 1. Find the starting point (Trigger Node)
        const triggerNode = nodes.find(n => n.type.includes('Trigger'));

        if (!triggerNode) {
            return res.status(400).json({ error: "Workflow must contain at least one Trigger node." });
        }

        logs.push(`[START] Triggered by ${triggerNode.type} for ${triggerNode.data.symbol || 'N/A'}`);

        // Fetch initial data if it's a price trigger
        if (triggerNode.type === 'priceTrigger' && triggerNode.data.symbol) {
            const priceRes = await axios.post('https://api.hyperliquid.xyz/info', { type: 'allMids' });
            context.lastPrice = parseFloat(priceRes.data[triggerNode.data.symbol]);
            logs.push(`[DATA] Current ${triggerNode.data.symbol} price is $${context.lastPrice}`);
        }

        // 2. Recursive Path Execution
        let currentId = triggerNode.id;
        let iterations = 0;

        while (iterations < 20) { // Safety loop to prevent infinite execution
            const outgoingEdge = edges.find(e => e.source === currentId);
            if (!outgoingEdge) {
                logs.push(`[END] Workflow finished at Node ${currentId}`);
                break;
            }

            const nextNode = nodes.find(n => n.id === outgoingEdge.target);
            if (!nextNode) break;

            logs.push(`[STEP] Moving to node: ${nextNode.type}`);

            // Logic for Action Nodes
            if (nextNode.type === 'hyperliquidAction') {
                const amount = nextNode.data.amount || 0;
                logs.push(`[ACTION] Hyperliquid: Simulated Order of ${amount} units using mid-price $${context.lastPrice || 'unknown'}`);
            }

            else if (nextNode.type === 'backpackAction') {
                logs.push(`[ACTION] Backpack: Executing authenticated trade simulation.`);
            }

            else if (nextNode.type === 'lighterAction') {
                logs.push(`[ACTION] Lighter: Verifying order book liquidity for simulation.`);
            }

            currentId = nextNode.id;
            iterations++;
        }

        res.json({
            success: true,
            executionLogs: logs,
            summary: {
                steps: iterations,
                finalStatus: "Completed"
            }
        });

    } catch (error: any) {
        console.error("Execution Error:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            logs
        });
    }
});

app.listen(PORT, () => {
    console.log(`
  🤖 QuidBot Simulation Backend (Ready for ReactFlow)
  --------------------------------------------------
  Status Check:  http://localhost:${PORT}/api/health
  Live Updates(USD):  http://localhost:${PORT}/api/market/price/SOL
  Execution:     http://localhost:${PORT}/api/workflow/execute
  --------------------------------------------------
  Ready to parse your custom UI workflows!
  `);
});