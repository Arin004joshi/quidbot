import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Importing types directly from the shared package
import {
    PriceNodeMetadata,
    TimerNodeMetadata,
    TradingMetadata
} from "common/types";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

dotenv.config();
const {
    R2_ENDPOINT_URL,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET
} = process.env;

if (!R2_ENDPOINT_URL || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET) {
    throw new Error("Missing R2 environment variables");
}

const s3 = new S3Client({
    region: "auto",
    endpoint: R2_ENDPOINT_URL,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

/**
 * Enhanced Types for QuidBot Engine
 * Uses metadata structures shared with the Frontend
 */
interface WorkflowNode {
    id: string;
    type: string;
    data: {
        type: "trigger" | "action";
        kind: string;
        metadata: PriceNodeMetadata | TimerNodeMetadata | TradingMetadata;
        label: string;
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
    res.json({ status: 'QuidBot Simulation Engine is Online', version: '1.2.0' });
});


app.get('/api/market/price/:symbol', async (req: Request<{ symbol: string }>, res: Response) => {
    const { symbol } = req.params;
    try {
        // Fetching all mid prices from Hyperliquid
        const response = await axios.post('https://api.hyperliquid.xyz/info', { type: 'allMids' });
        const price = response.data[symbol];

        if (!price) {
            return res.status(404).json({ error: `Symbol ${symbol} not found on Hyperliquid` });
        }

        res.json({
            symbol,
            price: parseFloat(price),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Market Data Error:", error);
        res.status(500).json({ error: 'Failed to fetch real-time market data' });
    }
});


// 2. Workflow Execution Engine
app.post('/api/workflow/execute', async (req: Request<{}, {}, WorkflowPayload>, res: Response) => {

    const { nodes, edges } = req.body;

    const logs: string[] = [];

    let context: any = {
        executionId: `qb-sim-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
    };

    console.log(`🚀 Starting NSE Execution ${context.executionId}`);

    try {

        /* ---------------- FIND TRIGGER ---------------- */

        const triggerNode = nodes.find(n => n.data.type === "trigger");

        if (!triggerNode) {
            return res.status(400).json({
                error: "Workflow must contain a Trigger node"
            });
        }

        const triggerKind = triggerNode.data.kind;

        logs.push(`[INIT] Execution ID: ${context.executionId}`);
        logs.push(`[START] Triggered by ${triggerKind}`);

        /* ---------------- PRICE TRIGGER ---------------- */

        if (triggerKind === "price-trigger") {

            const meta = triggerNode.data.metadata as PriceNodeMetadata;
            console.log(meta.asset)
            console.log(meta.price)

            logs.push(`[CONFIG] Monitoring NSE asset ${meta.asset} threshold ₹${meta.price}`);

            try {

                const response = await axios.get(
                    `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${meta.asset}.NS`, {
                    headers: {
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
                        Accept: "application/json",
                    },
                }
                );

                const price =
                    response.data?.quoteResponse?.result?.[0]?.regularMarketPrice;

                if (!price) throw new Error("Price unavailable");

                context.lastPrice = price;

                logs.push(`[DATA] Current ${meta.asset} NSE price: ₹${price}`);

            } catch (err) {

                logs.push(`[WARN] Failed to fetch NSE price. Using threshold value.`);

                context.lastPrice = meta.price;

            }

        }

        /* ---------------- TIMER TRIGGER ---------------- */

        else if (triggerKind === "timer-trigger") {

            const meta = triggerNode.data.metadata as TimerNodeMetadata;

            logs.push(`[CONFIG] Timer interval set to ${meta.time} seconds`);

        }

        /* ---------------- EXECUTION GRAPH ---------------- */

        let currentId = triggerNode.id;
        let iterations = 0;

        while (iterations < 20) {

            const outgoingEdge = edges.find(e => e.source === currentId);

            if (!outgoingEdge) {
                logs.push(`[FINISH] Execution graph completed.`);
                break;
            }

            const nextNode = nodes.find(n => n.id === outgoingEdge.target);

            if (!nextNode) break;

            const actionKind = nextNode.data.kind;

            const meta = nextNode.data.metadata as TradingMetadata;

            const asset = Array.isArray(meta.asset)
                ? meta.asset[0]
                : meta.asset;

            logs.push(`[STEP] Routing order to ${actionKind.toUpperCase()}`);

            /* ---------------- NSE ORDER SIMULATION ---------------- */

            logs.push(`[NSE] Preparing ${meta.type} order`);
            logs.push(`[NSE] Asset: ${asset}`);
            logs.push(`[NSE] Quantity: ${meta.quantity}`);

            if (context.lastPrice) {

                const totalValue = (meta.quantity * context.lastPrice).toFixed(2);

                logs.push(`[NSE] Market Price: ₹${context.lastPrice}`);
                logs.push(`[NSE] Order Value: ₹${totalValue}`);

            }

            logs.push(`[BROKER] Sending order to broker gateway...`);

            logs.push(
                `[SUCCESS] Order executed. Ref ID: NSE-${Math.random()
                    .toString(16)
                    .substring(2, 10)}`
            );

            currentId = nextNode.id;

            iterations++;

        }

        /* ---------------- RESPONSE ---------------- */

        res.json({
            success: true,
            executionLogs: logs,
            summary: {
                steps: iterations,
                finalStatus: "NSE Workflow Executed Successfully",
                timestamp: new Date().toISOString()
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

// GET /api/assets
app.get("/api/assets", async (req: Request, res: Response) => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET!,
            Prefix: "equity/",
        });

        const response = await s3.send(command);

        const assets =
            response.Contents
                ?.filter(file => file.Key?.endsWith(".parquet")) // only parquet files
                .map(file =>
                    file.Key!
                        .replace("equity/", "")     // remove folder
                        .replace(".parquet", "")    // remove extension
                ) || [];

        res.json({ assets });

    } catch (err) {
        console.error("R2 Fetch Error:", err);
        res.status(500).json({ error: "Failed to fetch assets from R2" });
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