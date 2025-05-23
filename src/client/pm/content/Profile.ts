import culement from "../../helper/culement"
import kelement from "../../helper/kelement"
import { lang } from "../../helper/lang"
import modal from "../../helper/modal"
import setbadge from "../../helper/setbadge"
import userState from "../../main/userState"
import { UserDB } from "../../types/db.types"
import { PrimaryClass } from "../../types/userState.types"

export default class Profile implements PrimaryClass {
  readonly id: string
  public isLocked: boolean
  private el: HTMLDivElement
  readonly user: UserDB
  constructor({ user }) {
    this.id = "profile"
    this.isLocked = false
    this.user = user
  }
  createElement(): void {
    this.el = kelement("div", "Profile pmcontent")
    this.el.innerHTML = `
    <div class="top">
      <div class="btn btn-back"><i class="fa-solid fa-arrow-left"></i></div>
      <div class="sect-title">${lang.APP_PROFILE}</div>
    </div>
    <div class="wall">
      <div class="chp displayname"><p></p></div>
      <div class="chp img">
      </div>
      <div class="chp username"><p></p></div>
      <div class="chp bio"><p></p></div>
      <div class="chp actions">
        <div class="btn btn-chat"><i class="fa-solid fa-comment-dots"></i><p>${lang.PROF_BTN_CHAT}</p></div>
        <div class="btn btn-call"><i class="fa-solid fa-phone"></i><p>${lang.PROF_BTN_VOICE}</p></div>
        <div class="btn btn-video"><i class="fa-solid fa-video"></i><p>${lang.PROF_BTN_VIDEO}</p></div>
      </div>
      <div class="chp options">
      </div>
    </div>`
  }
  writeDetail(): void {
    this.renImage()
    this.renUname()
    this.renDname()
    this.renBio()
  }
  renImage(): void {
    const eimage = <HTMLDivElement>this.el.querySelector(".wall .img")
    if (eimage.lastChild) eimage.lastChild.remove()
    const img = new Image()
    img.onerror = () => (img.src = "/assets/user.jpg")
    img.src = this.user.image ? `/file/user/${this.user.image}` : "/assets/user.jpg"
    img.alt = this.user.username
    eimage.prepend(img)
  }
  renUname(): void {
    const euname = <HTMLParagraphElement>this.el.querySelector(".wall .username p")
    euname.innerHTML = this.user.username
    if (this.user.badges && this.user.badges.length >= 1) {
      for (const badge of this.user.badges.sort((a, b) => b - a)) {
        euname.innerHTML += " " + setbadge(badge)
      }
    }
  }
  renDname(): void {
    const edname = <HTMLParagraphElement>this.el.querySelector(".wall .displayname p")
    edname.innerText = this.user.displayname
  }
  renBio(): void {
    const ebio = <HTMLParagraphElement>this.el.querySelector(".wall .bio p")
    ebio.innerText = this.user.bio || lang.ACC_NOBIO
  }
  clearOptions(eoptions: HTMLDivElement): void {
    while (eoptions.lastChild) eoptions.lastChild.remove()
  }
  renOptions(): void {
    const eoption = <HTMLDivElement>this.el.querySelector(".wall .options")
    this.clearOptions(eoption)
    if (!this.user.isFriend || this.user.isFriend === 0) return this.actNotFriend(eoption)
    if (this.user.isFriend === 1) return this.actFriend(eoption)
    if (this.user.isFriend === 2) return this.actSent(eoption)
    if (this.user.isFriend === 3) return this.actReceived(eoption)
  }
  actNotFriend(eoption: HTMLDivElement): void {
    const btn = kelement("div", "btn sb", { e: `<i class="fa-solid fa-user-plus"></i> ${lang.PROF_ADD}` })
    eoption.append(btn)
    btn.onclick = async () => {}
  }
  actFriend(eoption: HTMLDivElement): void {
    const btn = kelement("div", "btn sr", { e: `<i class="fa-solid fa-user-minus"></i> ${lang.PROF_UNFRIEND}` })
    btn.classList.add("btn", "sr")
    eoption.append(btn)
    btn.onclick = async () => {}
  }
  actSent(eoption: HTMLDivElement): void {
    eoption.innerHTML = `<div class="note sy">${lang.PROF_WAIT}</div>`
    const btn = kelement("div", "btn sr", { e: `<i class="fa-solid fa-user-xmark"></i> ${lang.PROF_CANCEL}` })
    eoption.append(btn)
    btn.onclick = async () => {}
  }
  actReceived(eoption: HTMLDivElement): void {
    const btn_a = kelement("div", "btn sg", { e: `<i class="fa-solid fa-user-check"></i> ${lang.PROF_ACCEPT}` })
    const btn_b = kelement("div", "btn sr", { e: `<i class="fa-solid fa-user-xmark"></i> ${lang.PROF_IGNORE}` })

    eoption.append(btn_a, btn_b)
    btn_a.onclick = async () => {}
    btn_b.onclick = async () => {}
  }
  update(): void | Promise<void> {}
  async destroy(): Promise<void> {
    this.el.classList.add("out")
    await modal.waittime()
    this.isLocked = false
    this.el.remove()
  }
  run(): void {
    userState.content = this
    this.createElement()
    culement.app().append(this.el)
    this.writeDetail()
    this.renOptions()
  }
}
