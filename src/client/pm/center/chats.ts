import culement from "../../helper/culement"
import kelement from "../../helper/kelement"
import { lang } from "../../helper/lang"
import modal from "../../helper/modal"
import sceneIn from "../../helper/sceneIn"
import { escapeHTML, ss } from "../../helper/escaper"
import userState from "../../main/userState"
import { db } from "../../manager/db"
import { ChatCard, ChatLastChat, ChatUser } from "../../types/chats.types"
import { KJSON } from "../../types/helper.types"
import sdate from "../../helper/sdate"

function transpile_lastchat(s: ChatLastChat): string {
  const myId = (<KJSON>db.user)?.id
  let text = ""

  if (s.type === "deleted") {
    text += `<i class="fa-solid fa-ban"></i> <i>${s.userid === myId ? lang.CONTENT_YOU_DELETED : lang.CONTENT_DELETED}</i>`
    return text
  }

  if (s.type === "call") {
    text += `<i class="fa-solid fa-phone-volume"></i> Voice Call`
    return text
  } else if (s.type === "image" || s.type === "video" || s.type === "file") {
    const trp = { image: "image", video: "film", file: "file" }
    text += `<i class="fa-light fa-${trp[s.type]}"></i> ` + (s.text ? escapeHTML(ss(s.text)) : "Media")
  } else if (s.type === "audio") {
    text += `<i class="fa-light fa-microphone"></i> Voice Chat`
  } else {
    text += escapeHTML(ss(<string>s.text))
  }

  if (s.userid === myId) {
    const isRead: boolean = s.watch.filter((usrid) => usrid !== myId).length >= 1
    const readStatus = kelement("i", { c: `fa-regular fa-check${isRead ? "-double" : ""}` })
    text = readStatus + text
  }

  return text
}

function dateTime(timestamp: number): string {
  const sameDay = sdate.sameday(Date.now(), timestamp)
  return sameDay ? sdate.time(timestamp) : sdate.date(timestamp)
}

function chat_card(s: ChatCard): { [key: string]: HTMLDivElement } {
  const { user, lastchat, unread } = s
  const card = kelement("div", { c: "card" })
  const eleft = kelement("div", { c: "left" })
  const eright = kelement("div", { c: "right" })
  const ecimg = kelement("div", { c: "img" })
  const img = new Image()
  img.alt = user.username
  img.src = user.photo || "/assets/user.jpg"
  img.width = 50
  const edetail = kelement("div", { c: "detail" })
  const eusername = kelement("div", { c: "name", e: `<div class="name"><p>Devanka</p></div>` })
  const elastchat = kelement("div", { c: "last", e: transpile_lastchat(lastchat) })

  const elastts = kelement("div", { c: "last", e: dateTime(s.lastchat.timestamp) })
  const eunread = kelement("div", { c: "unread", e: unread.toString() })

  card.append(eleft, eright)
  eleft.append(ecimg, edetail)
  ecimg.append(img)
  edetail.append(eusername, elastchat)
  eright.append(elastts, eunread)

  return { card, eusername, elastchat, elastts, eunread }
}

class Chats {
  readonly id: string
  private isLocked: boolean
  private el: HTMLDivElement
  private card_list: HTMLDivElement
  constructor() {
    this.id = "chats"
    this.isLocked = false
  }
  createElement(): void {
    this.el = kelement("div", { c: "chats" })
    this.card_list = kelement("div", { c: "card-list" })
    this.el.append(this.card_list)
  }
  btnListener(): void {}
  writeChatList(): void {
    const cdb = Object.values(db.chats || {}).sort((a, b) => {
      const cdba = Object.values(a.chats)
      const cdbb = Object.values(b.chats)
      if ((<KJSON>cdba[cdba.length - 1])?.ts > (<KJSON>cdbb[cdbb.length - 1])?.ts) return 1
      if ((<KJSON>cdba[cdba.length - 1])?.ts < (<KJSON>cdbb[cdbb.length - 1])?.ts) return -1
      return 0
    })

    cdb.forEach((ch) => {
      const user = <ChatUser>ch.user
      const inbox = Object.values(ch.chats)
      const unread = inbox.filter((cht) => {
        const ct = cht as KJSON
        return (
          ct.u !== (<KJSON>db.user).id &&
          ct.type !== "deleted" &&
          !(<string[]>ct.w).includes(<string>(<KJSON>db.user).id)
        )
      }).length

      const lastchat = <ChatLastChat>inbox[inbox.length - 1]
      const { card } = chat_card({ user, lastchat, unread })
      this.card_list.append(card)
    })

    // THESE ARE ONLY FOR PLACEHOLDER TO CHECK THE CSS STYLES
    const { card } = chat_card({
      user: { userid: "666666", username: "Rudi02" },
      lastchat: {
        timestamp: 1747678809977,
        type: "text",
        userid: "666666",
        watch: [],
        text: "Hehehe"
      },
      unread: 1
    })
    this.card_list.append(card)
  }
  fRemove(): void {
    this.isLocked = false
    userState.center = null
    userState.last = null
    this.el.remove()
  }
  async destroy(): Promise<void> {
    this.el.classList.add("out")
    await modal.waittime()
    this.el.remove()
    this.isLocked = false
    userState.center = null
    userState.last = null
  }
  run(): void {
    userState.center = this
    this.createElement()
    culement.app().append(this.el)
    sceneIn(this.el)
    this.writeChatList()
    this.btnListener()
  }
}

export default new Chats()
