export type IMessageWriterVoice = string

export interface IMessageWriterFiles {
  name: string
  src: string
}

export type IMessageWriterType = "text" | "image" | "video" | "audio" | "file" | "deleted" | "call"

export interface IMessageWriter {
  userid?: string
  timestamp?: number
  watch?: string[]
  text?: string
  type?: IMessageWriterType
  edit?: string
  reply?: string
  filesrc?: string
  filename?: string
}
