import { Router, Request, Response } from "express"

const router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.json({ "unix": Date.now(), "iso": new Date().toISOString(), "human": new Date().toLocaleString() })
})

export default router