import { Router, Request, Response } from "express"


const router = Router()


router.get('/', (req: Request, res: Response) => {
    res.json({
        "uuid": crypto.randomUUID()
    })
})

export default router