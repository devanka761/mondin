import userState from "../../main/userState"
import Chats from "../center/Chats"
import Find from "../center/Find"

async function excortCenter(): Promise<void> {
  if (userState.currcenter?.isLocked) return
  if (userState.currcenter) {
    await userState.currcenter.destroy()
  }
}
export default [
  {
    id: "find",
    txt: "APP_SEARCH",
    c: "fa-solid fa-magnifying-glass",
    run: async () => {
      excortCenter()
      new Find().run()
    }
  },
  {
    id: "chats",
    txt: "APP_CHATS",
    c: "fa-solid fa-comments",
    run: async () => {
      excortCenter()
      new Chats().run()
    }
  }
]
