import culement from "../../helper/culement"
import kelement from "../../helper/kelement"
import modal from "../../helper/modal"
import setbadge from "../../helper/setbadge"
import MessageWriter from "../../main/MessageWriter"
import userState from "../../main/userState"
import swiper from "../../manager/swiper"
import { UserDB } from "../../types/db.types"
import { PrimaryClass } from "../../types/userState.types"
import RoomForm from "../parts/RoomForm"
import Profile from "./Profile"

export default class Room implements PrimaryClass {
  readonly id: string
  public isLocked: boolean
  private el: HTMLDivElement
  private user: UserDB
  private middle: HTMLDivElement
  private bottom: HTMLDivElement
  private form: RoomForm
  constructor({ user }) {
    this.id = "room"
    this.isLocked = false
    this.user = user
    this.form = new RoomForm({ room: this })
  }
  private createElement(): void {
    this.el = kelement("div", "Room pmcontent")
    this.el.innerHTML = `
    <div class="top">
      <div class="left">
        <div class="btn btn-back"><i class="fa-solid fa-arrow-left"></i></div>
        <div class="user">
          <div class="img"></div>
          <div class="names"><p class="uname"></p><p class="dname"></p></div>
        </div>
      </div>
      <div class="right">
        <div class="btn btn-video">
          <i class="fa-solid fa-video"></i>
        </div>
        <div class="btn btn-call">
          <i class="fa-solid fa-phone"></i>
        </div>
        <div class="btn btn-more">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="chatlist"></div>
    </div>
    <div class="bottom">
    </div>`
    this.middle = <HTMLDivElement>this.el.querySelector(".mid")
    this.bottom = <HTMLDivElement>this.el.querySelector(".bottom")
  }
  private writeData(): void {
    this.writeUser()
    this.writeForm()
  }
  private writeUser(): void {
    const img = new Image()
    img.onerror = () => (img.src = "/assets/user.jpg")
    img.alt = this.user.username
    img.src = this.user.image ? `/file/user/${this.user.image}` : "/assets/user.jpg"
    const eimg = <HTMLDivElement>this.el.querySelector(".top .left .user .img")
    eimg.append(img)

    const euname = <HTMLDivElement>this.el.querySelector(".top .left .user .names .uname")
    euname.innerText = this.user.username
    if (this.user.badges) setbadge(euname, this.user.badges)
    const edname = <HTMLDivElement>this.el.querySelector(".top .left .user .names .dname")
    edname.innerText = this.user.displayname

    const euser = <HTMLDivElement>this.el.querySelector(".top .left .user")
    euser.onclick = () => {
      swiper(new Profile({ user: this.user, classBefore: this }), userState.currcontent)
    }
  }
  private writeForm(): void {
    this.form.run(this.bottom)
  }
  resizeMiddle(formHeight: number): void {
    this.bottom.style.height = `${formHeight}px`
    this.middle.style.height = `calc(100% - (60px + ${formHeight}px))`
  }
  update(): void | Promise<void> {}
  async destroy(): Promise<void> {
    this.el.classList.add("out")
    await modal.waittime()
    this.isLocked = false
    this.el.remove()
  }
  sendMessage(messageWriten: MessageWriter): void {
    console.log(messageWriten)
  }
  run(): void {
    userState.content = this
    this.createElement()
    culement.app().append(this.el)
    this.writeData()
  }
}
