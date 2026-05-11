import { Router, Request, Response } from "express"
import * as z from "zod"

const router = Router()

const diffReq = z.object({
    a: z.string(),
    b: z.string()
})

router.post('/', (req: Request, res: Response) => {
    let parsed: z.infer<typeof diffReq>
    try {
        parsed = diffReq.parse(req.body)
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({ errors: e.issues })
        }
        return res.status(400).json({ error: "Invalid request data" })
    }
    const aLines = parsed.a.split('\n')
    const bLines = parsed.b.split('\n')
    const added = bLines.filter(line => !aLines.includes(line))
    const removed = aLines.filter(line => !bLines.includes(line))
    const unchanged = aLines.filter(line => bLines.includes(line))

    return res.json({ "added": added, "removed": removed, "unchanged": unchanged })
})

export default router