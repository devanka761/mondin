import express, { Request, Response, Router } from "express"
import * as hprofile from "../controller/profile.controller"
import { rep } from "../main/helper"
import { cdUser, isUser } from "../main/middlewares"
// import validate from "../main/validate"

const router: Router = express.Router()

router.use(cdUser, isUser)

router.get("/search/:search_id", (req: Request, res: Response) => {
  const searchUser = rep(hprofile.searchUser(<string>req.user?.id, req.params.search_id))
  res.json(searchUser)
})

export default router
