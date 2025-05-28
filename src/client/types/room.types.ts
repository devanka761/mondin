export interface RoomFormContent {
  rep?: string
  voice?: {
    src: string
    blob: string
  }
  file?: {
    name: string
    src: string | ArrayBuffer | null
  }
}
