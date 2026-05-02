import 'dotenv/config'
import express from "express"
import helmet from "helmet"
import healthRouter from "./routes/health"
import uuidRouter from "./routes/uuid"
import hashRouter from "./routes/hash"


const app = express()

// Middle ware
app.use(helmet())
app.use(express.json())



// very cool routes


// Functionality
// GET /health
app.use('/health', healthRouter)

// GET /uuid     generate UUID v4
app.use('/uuid', uuidRouter)

// POST /hash     body: { input, algorithm } --> SHA256/MD5/SHA1
app.use('/hash', hashRouter)

// POST /encode / POST /decode    Base64 or URL encoding
// POST /json/format    prettify + validate JSON
// POST /diff     compare two strings/JSON blobs, return diff
// GET /timestamp 
// GET /logs   last N requests



// Error handler (must be last)
// app.use(errorHandler)


export default app