import { Metadata } from "next";
import { prisma } from "@/lib/db";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { camelCaseToTitleCase } from "@/lib/utils";
import { UpdateRoleDropdown } from "@/components/admin/UpdateRoleDropdown";
import { RemoveUserDialog } from "@/components/admin/RemoveUserDialog";
import { AddUserDialog } from "@/components/admin/AddUserDialog";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const staff = await prisma.user.findMany({
    where: {
      role: {
        not: "user",
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Admin Dashboard</h1>
      <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-6">
        <div className="bg-gray-200/5 p-5 rounded-md w-full">
          <p className="text-sm font-medium text-gray-500 leading-6">
            The roles are as follows:<br />
            <strong>Post Editor</strong>- Can add/delete/edit posts (newsletter).<br />
            <strong>Event Editor</strong>- Can add/delete/edit events.<br />
            <strong>Mod</strong> - Can add/delete/edit both, posts and events.<br />
            <strong>Admin</strong> - Can do all of the above and add/remove users from the staff team.
          </p>
        </div>
        <AddUserDialog />
        <Table className="mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    {camelCaseToTitleCase(user.role)}
                    <UpdateRoleDropdown
                      userId={user.id}
                      currentRole={user.role}
                    />
                  </div>
                </TableCell>
                <TableCell className="flex gap-2 text-right justify-end">
                  <RemoveUserDialog
                    userId={user.id}
                    userName={user.name || ""}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
