"use client";
import { LiveblocksProvider } from "@liveblocks/react/suspense";
function CustomLiveBlocksProvider({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error("Key is not");
  }
  return (
    <LiveblocksProvider authEndpoint={"/auth-endpoint"} throttle={16}>
      {children}
    </LiveblocksProvider>
  );
}
export default CustomLiveBlocksProvider;
