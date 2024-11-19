import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PreProcess() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">File No.</TableHead>
          <TableHead>FullName</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone No.</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">QEF341</TableCell>
          <TableCell>NisabMohd</TableCell>
          <TableCell>nisabmohd@gmail.com</TableCell>
          <TableCell>636540543</TableCell>
          <TableCell className="text-right">
            <Button
              size="sm"
              className="w-fit bg-blue-500 hover:bg-blue-600 m-0"
            >
              View
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">NBV425</TableCell>
          <TableCell>Sohail Shah</TableCell>
          <TableCell>sohailali@gmail.com</TableCell>
          <TableCell>1367542578</TableCell>
          <TableCell className="text-right">
            <Button
              size="sm"
              className="w-fit bg-blue-500 hover:bg-blue-600 m-0"
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
