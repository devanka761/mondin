import { MeDB, PeerDB } from "../../client/types/db.types"

export type AccountDB = {
  me?: MeDB
  peer?: PeerDB
}
