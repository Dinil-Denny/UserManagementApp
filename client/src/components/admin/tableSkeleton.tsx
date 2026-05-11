import { Skeleton } from "@components/ui/skeleton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell
} from "@components/ui/table";

const SkeletonTable = () => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-35">
              <Skeleton className="h-5 w-30" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-20" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-20" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-5 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 7 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton className="h-6 w-30" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-6 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SkeletonTable;
