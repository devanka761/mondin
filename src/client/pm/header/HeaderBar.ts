import culement from "../../helper/culement"
import kelement from "../../helper/kelement"

class HeaderBar {
  readonly id: string
  private isLocked: boolean
  private appname: string
  private el: HTMLDivElement
  private apptitle: HTMLDivElement
  private eactions: HTMLDivElement
  private btn_find: HTMLDivElement
  private btn_settings: HTMLDivElement
  constructor() {
    this.id = "header"
    this.appname = "KIRIMIN"
    this.isLocked = false
  }
  createElement(): void {
    this.el = kelement("div", { c: "header" })
    this.apptitle = kelement("div", { c: "title", e: "KIRIMIN" })
    this.eactions = kelement("div", { c: "actions" })
    this.btn_find = kelement("div", { c: "btn btn-find", e: `<i class="fa-solid fa-fw fa-magnifying-glass"></i>` })
    this.btn_settings = kelement("div", {
      c: "btn btn-settings",
      e: `<i class="fa-solid fa-fw fa-ellipsis-vertical"></i>`
    })
    this.el.append(this.apptitle, this.eactions)
    this.eactions.append(this.btn_find, this.btn_settings)
  }
  set AppName(newtitle: string) {
    this.appname = newtitle
    this.apptitle.innerHTML = newtitle
  }
  get AppName(): string {
    return this.appname
  }
  run(): void {
    this.createElement()
    culement.app().append(this.el)
  }
}
export default new HeaderBar()
