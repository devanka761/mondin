import userState from "../../main/userState"
import Chats from "../center/Chats"

function excortCenter(): void {
  if (userState.currcenter?.isLocked) return
  if (userState.currcenter) {
    userState.currcenter.destroy()
  }
}
// function excortContent(): void {
//   if ((<KJSON>userState.currcontent)?.isLocked) return
//   const destroyCenter = <KJOLL>userState?.currcontent
//   if (destroyCenter) destroyCenter.destroy()
// }

export default [
  {
    id: "chats",
    txt: "APP_CHATS",
    c: "fa-solid fa-comments",
    run: () => {
      excortCenter()
      new Chats().run()
    }
  }
]
