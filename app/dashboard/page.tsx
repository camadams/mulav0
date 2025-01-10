import Navbar from "../components/Navbar";
import SpendingsTracker from "../components/SpendingsTracker";

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect("/api/auth/signin")
  // }
  //TODO

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.name}</h1> */}
      {/* <h1 className="text-2xl font-bold mb-4">Welcome, </h1> */}
      <Navbar />
      <SpendingsTracker />
    </div>
  );
}
