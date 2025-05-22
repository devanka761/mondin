import kelement from "./kelement"

const localeBadge: { [key: string]: [string, string] } = {
  "1": ["dev", "DEVELOPER"],
  "2": ["staff", "STAFF"],
  "3": ["mod", "MODERATOR"],
  "4": ["donator", "DONATOR"],
  "5": ["verified", "VERIFIED"]
}
export default function setbadge(n: number | string): HTMLElement {
  if (typeof n === "number") n = n.toString()
  const i = kelement("i", "B")
  i.innerHTML = localeBadge[n][0]
  i.title = localeBadge[n][1]
  return i
}
