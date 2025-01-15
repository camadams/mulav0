import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { getCategoryColor } from "../lib/getCategoryColors";
import EditSpendingForm from "./EditSpendingForm";
import { Button } from "@/components/ui/button";
import { Spending } from "./SpendingsTracker";

const categoryColors: { [key: string]: { bg: string; text: string } } = {
  Food: { bg: "bg-green-200", text: "text-green-800" },
  Transportation: { bg: "bg-blue-200", text: "text-blue-800" },
  Entertainment: { bg: "bg-purple-200", text: "text-purple-800" },
  Housing: { bg: "bg-yellow-200", text: "text-yellow-800" },
  Health: { bg: "bg-red-200", text: "text-red-800" },
  Other: { bg: "bg-gray-200", text: "text-gray-800" },
};

export default function SpendingsList({
  spendings,
}: {
  spendings: Spending[];
}) {
  // console.log({ spendings });
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spendings.map((spending) => (
            <TableRow
              className={`${spending.sending ? "bg-red-100" : ""}`}
              key={spending.id}
            >
              <TableCell className="w-fit whitespace-nowrap">
                {format(new Date(spending.date), "E, d MMM") || spending.date}
              </TableCell>
              <TableCell>{spending.description}</TableCell>
              <TableCell>${spending.price.toFixed(2)}</TableCell>
              <TableCell>
                <div
                  className={`inline-block px-1 py-0.5 rounded-full ${
                    getCategoryColor(spending.categoryId).bg
                  } ${getCategoryColor(spending.categoryId).text} `}
                >
                  {spending.categoryId}
                </div>
              </TableCell>
              <TableCell>
                <EditSpendingForm spending={spending} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Button className="mt-2">Add Spending</Button> */}
    </Card>
  );
}
