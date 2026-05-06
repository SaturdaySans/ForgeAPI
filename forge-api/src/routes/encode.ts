import { Router, Request, Response } from "express"
import * as z from "zod";

const router = Router()

const encodeReq = z.object({
    input: z.string(),
    type: z.enum(["base64", "url"]),
    mode: z.enum(['encode', 'decode'])
})

router.post('/', (req: Request, res: Response) => {
    let parsed: z.infer<typeof encodeReq>;
    try {
        parsed = encodeReq.parse(req.body);
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({ errors: e.issues })
        }
        return res.status(400).json({ error: 'Invalid request data' });
    }
    if (parsed.type === "base64") {
        if (parsed.mode === "encode") {
            const buffer = Buffer.from(parsed.input, 'utf-8');
            const result = buffer.toString('base64')
            res.json({ result })
        }
        else {
            const buffer = Buffer.from(parsed.input, 'base64');
            const result = buffer.toString('utf-8')
            res.json({ result })
        }
    }
    if (parsed.type === "url") {
        if (parsed.mode === "encode") {
            const result = encodeURIComponent(parsed.input)
            res.json({ result })
        }
        else {
            const result = decodeURIComponent(parsed.input)
            res.json({ result })
        }
    }
})

export default router