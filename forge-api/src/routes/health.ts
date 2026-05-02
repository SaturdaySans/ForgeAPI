import { Router, Request, Response } from "express"

const router = Router()
const { version } = require('../../package.json')
const start_time = Date.now()

router.get('/', (req: Request, res: Response) => {
    const uptimems = Date.now() - start_time
    const uptimeseconds = Math.floor(uptimems / 1000)

    res.json({
        status: 'great', version, uptime: {
            seconds: uptimeseconds, human: readify(uptimeseconds)
        },
    });
});

function readify(uptimeseconds: number): string {
    const hr = Math.floor(uptimeseconds / 3600)
    const mth = Math.floor((uptimeseconds % 3600) / 60)
    const sec = uptimeseconds % 60
    return `${hr}h ${mth}m ${sec}s`

}

export default router
