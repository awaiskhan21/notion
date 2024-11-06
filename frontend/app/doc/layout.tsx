import CustomLiveBlocksProvider from "@/components/LiveBlocksProvider";

function layout({ children }: { children: React.ReactNode }) {
  return <CustomLiveBlocksProvider>{children}</CustomLiveBlocksProvider>;
}
export default layout;
