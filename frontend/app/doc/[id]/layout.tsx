import { auth } from "@clerk/nextjs/server";

function DocLayout() {
  auth.protect();
  return <div>DocLayout</div>;
}
export default DocLayout;
