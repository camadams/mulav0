import { auth } from "../lib/auth";

export default async function Test() {
  const session = await auth();
  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
}
