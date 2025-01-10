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

export type Spending = {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
};

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
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-0">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spendings.map((spending) => (
            <TableRow key={spending.id}>
              <TableCell>
                {format(new Date(spending.date), "E, d MMM") || spending.date}
              </TableCell>
              <TableCell>{spending.description}</TableCell>
              <TableCell>${spending.amount.toFixed(2)}</TableCell>
              <TableCell>
                <div
                  className={`inline-block px-2 py-1 rounded-full ${
                    getCategoryColor(spending.category).bg
                  } ${getCategoryColor(spending.category).text}`}
                >
                  {spending.category}
                </div>
              </TableCell>
              <TableCell>
                <EditSpendingForm spending={spending} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
