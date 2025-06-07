export type RoomVoiceContent = string
export interface RoomFileContent {
  name: string
  src: string
}
export interface RoomFormContent {
  rep?: string
  voice?: RoomVoiceContent
  file?: RoomFileContent
}
