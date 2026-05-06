import { Router, Request, Response } from "express"
import * as z from "zod"

const router = Router()

const jsonReq = z.object({
    input: z.string()
})

router.post('/', (req: Request, res: Response) => {
    let parsed: z.infer<typeof jsonReq>;
    try {
        parsed = jsonReq.parse(req.body)
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({ errors: e.issues })
        }
        return res.status(400).json({ error: "Invalid request data" })
    }
    try {
        const pretty = JSON.stringify(JSON.parse(parsed.input), null, 2)
        res.json({ json: pretty, valid: true })
    }
    catch (e) {
        return res.status(400).json({ json: parsed.input, valid: false })
    }
})

export default router