// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { authOptions } from "../lib/auth";

export default async function SubscriptionPage() {
  return <div>hi2</div>;
}
//   // const session = await getServerSession(authOptions);

//   // if (!session) {
//   //   redirect("/api/auth/signin");
//   // }

//   return (
//     <div className="container mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Subscription Status</CardTitle>
//           <CardDescription>Manage your subscription here</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <h3 className="font-medium">Current Plan</h3>
//               <p>Free Plan</p>
//             </div>
//             <div>
//               <h3 className="font-medium">Features</h3>
//               <ul className="list-disc list-inside space-y-1">
//                 <li>Basic spending tracking</li>
//                 <li>Monthly reports</li>
//                 <li>Up to 100 transactions</li>
//               </ul>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
