import culement from "../../helper/culement"
import kelement from "../../helper/kelement"
import { lang } from "../../helper/lang"
import userState from "../../main/userState"
import { PrimaryClass } from "../../types/userState.types"
import _navlist from "./_navlist"

export default class Nav implements PrimaryClass {
  readonly id: string
  public isLocked: boolean
  private el: HTMLDivElement
  constructor() {
    this.id = "nav"
    this.isLocked = false
  }
  createElement(): void {
    this.el = kelement("div", "nav")
  }
  writeNav(): void {
    _navlist.forEach((btn) => {
      const elnav = kelement("div", `btn nav-${btn.id}`)

      const centerClass = <PrimaryClass>userState.currcenter
      if (centerClass.id === btn.id) {
        elnav.classList.add("selected")
      } else if ((!centerClass || !centerClass.id) && btn.id === "chats") {
        elnav.classList.add("selected")
      }
      elnav.append(kelement("i", btn.c), kelement("p", null, { e: lang[btn.txt] }))
      this.el.append(elnav)
      elnav.onclick = async () => {
        if (this.isLocked) return
        this.isLocked = true
        btn.run()
        this.isLocked = false
      }
    })
  }
  update(): void {}
  destroy(): void {}
  run(): void {
    userState.tab = this
    this.createElement()
    culement.app().append(this.el)
    this.writeNav()
  }
}
