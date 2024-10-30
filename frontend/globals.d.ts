import { User } from "./types/types";

//extend sessionClaims to include user which i added in clerk
declare global {
  interface CustomJwtSessionClaims extends User {}
}
