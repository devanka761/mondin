import culement from "../../helper/culement"
import kelement from "../../helper/kelement"
import { lang } from "../../helper/lang"
import modal from "../../helper/modal"
import { escapeHTML, ss } from "../../helper/escaper"
import userState from "../../main/userState"
import { db } from "../../manager/db"
import { ChatCard } from "../../types/chats.types"
import sdate from "../../helper/sdate"
import { PrimaryClass } from "../../types/userState.types"
import { ChatDB, ChatsDB } from "../../types/db.types"

function transpile_lastchat(s: ChatDB): string {
  const myId = <string>db.me.id
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
    const isRead: boolean = (s.watch || []).filter((usrid) => usrid !== myId)?.length >= 1
    const readStatus = kelement("i", `fa-regular fa-check${isRead ? "-double" : ""}`)
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
  const card = kelement("div", "card")
  const eleft = kelement("div", "left")
  const eright = kelement("div", "right")
  const ecimg = kelement("div", "img")
  const img = new Image()
  img.alt = user.username
  img.src = user.image || "/assets/user.jpg"
  img.width = 50
  const edetail = kelement("div", "detail")
  const eusername = kelement("div", "name", { e: `<div class="name"><p>Devanka</p></div>` })
  const elastchat = kelement("div", "last", { e: transpile_lastchat(lastchat) })

  const elastts = kelement("div", "last", { e: dateTime(s.lastchat.timestamp) })
  const eunread = kelement("div", "unread", { e: unread.toString() })

  card.append(eleft, eright)
  eleft.append(ecimg, edetail)
  ecimg.append(img)
  edetail.append(eusername, elastchat)
  eright.append(elastts, eunread)

  return { card, eusername, elastchat, elastts, eunread }
}

export default class Chats implements PrimaryClass {
  readonly id: string
  public isLocked: boolean
  private el: HTMLDivElement
  private card_list: HTMLDivElement
  constructor() {
    this.id = "chats"
    this.isLocked = false
  }
  createElement(): void {
    this.el = kelement("div", "Chats pmcenter")
    this.card_list = kelement("div", "card-list")
    this.el.append(this.card_list)
  }
  btnListener(): void {}
  writeChatList(): void {
    const cdb: ChatsDB[] = Object.values(db.c || {}).sort((a, b) => {
      const cdba = Object.values(a.c)
      const cdbb = Object.values(b.c)
      if (cdba[cdba.length - 1].timestamp > cdbb[cdbb.length - 1].timestamp) return 1
      if (cdba[cdba.length - 1].timestamp < cdbb[cdbb.length - 1].timestamp) return -1
      return 0
    })
    cdb.forEach((ch) => {
      const user = ch.u
      const inbox = Object.values(ch.c)
      const unread = inbox.filter((ct) => {
        return ct.userid !== db.me.id && ct.type !== "deleted" && !ct.watch?.includes(<string>db.me.id)
      }).length

      const lastchat = inbox[inbox.length - 1]
      const { card } = chat_card({ user, lastchat, unread })
      this.card_list.append(card)
    })

    // THESE ARE ONLY FOR PLACEHOLDER TO CHECK THE CSS STYLES
    // const { card } = chat_card({
    //   user: { userid: "666666", username: "Rudi02" },
    //   lastchat: {
    //     timestamp: 1747678809977,
    //     type: "text",
    //     userid: "666666",
    //     watch: [],
    //     text: "Hehehe"
    //   },
    //   unread: 1
    // })
    // this.card_list.append(card)

    this.writeIfEmpty(cdb)
  }
  writeIfEmpty(cdb: ChatsDB[]): void {
    const oldNomore: HTMLParagraphElement | null = document.querySelector(".nomore")
    if (cdb.length < 1) {
      if (oldNomore) return
      const nomore = kelement("p", "nomore", { e: `${lang.CHTS_NOCHAT}<br/>${lang.CHTS_PLS}` })
      this.card_list.append(nomore)
    } else {
      if (oldNomore) oldNomore.remove()
    }
  }
  async destroy(): Promise<void> {
    const useanim = true
    if (useanim) {
      this.el.classList.add("out")
      await modal.waittime()
    }
    this.el.remove()
    this.isLocked = false
    userState.center = null
    userState.last = null
    // const useanim = true
    // if (useanim) return await this.sdestroy()
    // else return this.fdestroy()
  }
  update(): void {}
  run(): void {
    userState.center = this
    this.createElement()
    culement.app().append(this.el)
    this.writeChatList()
    this.btnListener()
  }
}
