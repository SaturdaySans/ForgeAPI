import { Router, Request, Response } from "express"
import { createHash } from 'crypto'
import * as z from "zod";

const router = Router()

const hashreq = z.object({
    input: z.string(),
    algorithm: z.enum(["sha256", "md5", "sha1"])
});

router.post('/', (req: Request, res: Response) => {
    let parsed: z.infer<typeof hashreq>;
    try {
        parsed = hashreq.parse(req.body);
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).json({ errors: e.issues });
        }
        return res.status(400).json({ error: 'Invalid request data' });
    }
    const hash = createHash(parsed.algorithm).update(parsed.input).digest('hex')
    res.json({ hash })
})

export default router