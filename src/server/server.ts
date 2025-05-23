process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"
import fs from "fs"
import express, { Application, Request, Response } from "express"
import session from "express-session"
import SessionFileStore, { FileStore } from "session-file-store"
import { ExpressPeerServer } from "peer"
import authRouter from "./routes/auth.route"
import accountRouter from "./routes/account.route"
import profileRouter from "./routes/profile.route"
import fileRouter from "./routes/file.route"
import cfg from "./main/cfg"
import { peerKey } from "./main/helper"
import db from "./main/db"
import { sessionUserBinder } from "./main/binder"

if (!fs.existsSync("./server")) fs.mkdirSync("./server")
if (!fs.existsSync("./server/sessions")) {
  fs.mkdirSync("./server/sessions")
  console.log("Sessions Reloaded!")
}
db.load()

const app: Application = express()

const SessionFileStorage: FileStore = SessionFileStore(session)

app.use(
  session({
    secret: cfg.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, sameSite: "strict" },
    store: new SessionFileStorage({ path: "./server/sessions", logFn() {} })
  })
)

app.use(sessionUserBinder)

app.use(express.static("client"))
app.set("view engine", "ejs")

const PORT: number = cfg.APP_PORT as number

app.use("/x/auth", authRouter)
app.use("/x/account", accountRouter)
app.use("/x/profile", profileRouter)
app.use("/file", fileRouter)

app.get("/app", (req: Request, res: Response) => {
  res.render("app")
})

app.get("/", (req: Request, res: Response) => {
  res.render("home")
})

const appService = app.listen(PORT, () => {
  console.log(`ONLINE >> http://localhost:${PORT}/app`)
  console.log(`PEERS >> http://localhost:${PORT}/cloud/${peerKey}/peers`)
})

const server = ExpressPeerServer(appService, {
  key: peerKey,
  allow_discovery: true
})

server.on("error", console.error)

app.use("/cloud", server)

app.use("/", (req: Request, res: Response) => {
  res.json({ ok: false, code: 404, msg: "NOT FOUND" })
})
