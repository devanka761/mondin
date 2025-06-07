import express, { Request, Response, Router } from "express"
import * as hroom from "../controller/room.controller"
import { rep } from "../main/helper"
import { cdUser, isUser } from "../main/middlewares"

const router: Router = express.Router()

router.use(cdUser, isUser, express.json({ limit: "100KB" }))

router.post("/sendMessage/:chat_id", (req: Request, res: Response) => {
  const sendMessage = rep(hroom.sendMessage(<string>req.user?.id, req.body))
  res.status(sendMessage.code).json(sendMessage)
})

export default router
