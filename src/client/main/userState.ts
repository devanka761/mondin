import { UserInstance, UserLocked, UserNotif } from "../types/userState.types"

class UserState {
  private notif: UserNotif
  private color: "dark" | "light"
  private currtab: UserInstance
  private currcenter: UserInstance
  private currcontent: UserInstance
  private currlast: UserInstance
  public locked: UserLocked
  constructor() {
    this.color = "dark"
    this.notif = { a01: 1, a02: 1, a03: 1 }
    this.currtab = null
    this.currcenter = null
    this.currcontent = null
    this.currlast = null
    this.locked = { currtab: false, currcenter: false, currcontent: false }
  }
  set tab(newtab: UserInstance) {
    this.currlast = newtab
    this.currtab = newtab
  }
  get tab(): UserInstance {
    return this.currtab
  }
  set center(newcenter: UserInstance) {
    this.currlast = newcenter
    this.currcenter = newcenter
  }
  get center(): UserInstance {
    return this.currcenter
  }
  set content(newcontent: UserInstance) {
    this.currlast = newcontent
    this.currcontent = newcontent
  }
  get content(): UserInstance {
    return this.currcontent
  }
  set last(newlast: UserInstance) {
    this.currlast = newlast
    this.currlast = newlast
  }
  get last(): UserInstance {
    return this.currlast
  }
}

export default new UserState()
