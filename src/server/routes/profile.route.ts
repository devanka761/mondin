import express, { Request, Response, Router } from "express"
import * as hprofile from "../controller/profile.controller"
import { rep } from "../main/helper"
import { cdUser, isUser } from "../main/middlewares"
import validate from "../main/validate"
// import validate from "../main/validate"

const router: Router = express.Router()

router.use(cdUser, isUser, express.json({ limit: "100KB" }))

router.post("/addfriend", (req: Request, res: Response) => {
  if (!validate(["userid"], req.body)) res.json(rep({ code: 400 }))
  res.json(rep(hprofile.addfriend(<string>req.user?.id, req.body)))
})
router.post("/unfriend", (req: Request, res: Response) => {
  if (!validate(["userid"], req.body)) res.json(rep({ code: 400 }))
  res.json(rep(hprofile.unfriend(<string>req.user?.id, req.body)))
})
router.post("/cancelfriend", (req: Request, res: Response) => {
  if (!validate(["userid"], req.body)) res.json(rep({ code: 400 }))
  res.json(rep(hprofile.cancelfriend(<string>req.user?.id, req.body)))
})
router.post("/acceptfriend", (req: Request, res: Response) => {
  if (!validate(["userid"], req.body)) res.json(rep({ code: 400 }))
  res.json(rep(hprofile.acceptfriend(<string>req.user?.id, req.body)))
})
router.post("/ignorefriend", (req: Request, res: Response) => {
  if (!validate(["userid"], req.body)) res.json(rep({ code: 400 }))
  res.json(rep(hprofile.ignorefriend(<string>req.user?.id, req.body)))
})

router.get("/search/:search_id", (req: Request, res: Response) => {
  const searchUser = rep(hprofile.searchUser(<string>req.user?.id, req.params.search_id))
  res.json(searchUser)
})

export default router
