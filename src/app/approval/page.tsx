"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, CreditCard, FileImage, FileText, MoreHorizontal, Target, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Eye, LucideFileImage } from "lucide-react";
import { Check, Ban } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { toast } from "react-toastify"



const data: Payment[] = [
  {
    id: "m5gr84i9",
    role: "Fundraiser",
    username: "K23056",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    role: "Investor",
    username: "K25865",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    role: "Fundraiser",
    username: "k25068",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    role: "Fundraiser",
    username: "K85469",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    role: "Investor",
    username: "K85641",
    email: "carmella@hotmail.com",
  },
]

export type Payment = {
  id: string
  role: string
  username: string
  email: string
}

function handleClick() {
  console.log("I am Clicked");
}

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Username",
    id: "username",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    id: "role",

    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>,
  },
  {
    accessorKey: "",
    id: "Actions",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {


      // Format the amount as a dollar amount
      //   const formatted = new Intl.NumberFormat("en-US", {
      //     style: "currency",
      //     currency: "USD",
      //   }).format(amount)

      //   return <div className="text-right font-medium">{formatted}</div>
      return (

        // <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //         <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleClick}>
        //             <span className="sr-only">Open menu</span>
        //             <MoreHorizontal />
        //         </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">



        //         <DropdownMenuItem>Approve <Check /> </DropdownMenuItem>
        //         <DropdownMenuSeparator />
        //         <DropdownMenuItem>Reject <Ban /></DropdownMenuItem>
        //     </DropdownMenuContent>
        // </DropdownMenu>


        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center pb-4 border-b">
                Investor Profile Preview
              </DialogTitle>
            </DialogHeader>

            <div>
              {/* Main Information */}
              <div className="grid grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 pb-3 border-b mb-4">
                      <User className="h-5 w-5 text-blue-600" />
                      <Label className="text-lg font-semibold text-gray-700">Personal Information</Label>
                    </div>

                    <div className="grid ">
                      <div className="flex items-center min-h-[2.5rem]">
                        <Label className="w-1/3 text-gray-500">Name:</Label>
                        <span className="flex-1 font-medium">Siddartha Kumar</span>
                      </div>

                      <div className="flex items-center min-h-[2.5rem]">
                        <Label className="w-1/3 text-gray-500">Email:</Label>
                        <span className="flex-1 font-medium">test@gmail.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 pb-3 border-b mb-4">
                      <Target className="h-5 w-5 text-green-600" />
                      <Label className="text-lg font-semibold text-gray-700">Investment Focus</Label>
                    </div>

                    <div className="grid ">
                      <div className="flex items-center min-h-[2.5rem]">
                        <Label className="w-1/3 text-gray-500">Sector:</Label>
                        <span className="flex-1 font-medium">IT Industry</span>
                      </div>

                      <div className="flex items-center min-h-[2.5rem]">
                        <Label className="w-1/3 text-gray-500">Specifics:</Label>
                        <span className="flex-1 font-medium">Banking & Arms</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 pb-3 border-b mb-4">
                      <Wallet className="h-5 w-5 text-purple-600" />
                      <Label className="text-lg font-semibold text-gray-700">Investment Details</Label>
                    </div>

                    <div className="grid ">
                      <div className="flex items-center min-h-[2.5rem]">
                        <Label className="w-1/3 text-gray-500">Budget:</Label>
                        <span className="flex-1 font-medium text-green-600">$700,000</span>
                      </div>

                      <div className="flex items-center min-h-[2.5rem]">
                        <Label className="w-1/3 text-gray-500">Experience:</Label>
                        <span className="flex-1 font-medium">5 Years</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3 pb-3 border-b mb-4">
                      <FileText className="h-5 w-5 text-orange-600" />
                      <Label className="text-lg font-semibold text-gray-700">About</Label>
                    </div>

                    <div className="grid gap-4">
                      <div className="min-h-[5rem] flex items-center">
                        <p className="text-gray-700 leading-relaxed">
                          Serial entrepreneur turned angel investor with a strong focus on fintech innovations
                          and AI/ML applications. Looking for disruptive early-stage startups with strong
                          technical foundations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Document Preview Section */}
              <div className="border-t mt-6 pt-2">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Verification Documents</h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Tax Return Preview */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-blue-50 px-4 py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <FileImage className="h-5 w-5 text-blue-600" />
                        <Label className="font-medium text-blue-800">Tax Return</Label>
                      </div>
                    </div>
                    <div className="aspect-[6/2] p-4">
                      <div className="h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <FileImage className="h-12 w-12 mx-auto text-gray-400" />
                          <span className="text-sm text-gray-500 mt-2 block">Tax Return Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Statement Preview */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-green-50 px-4 py-2 border-b">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-green-600" />
                        <Label className="font-medium text-green-800">Bank Statement</Label>
                      </div>
                    </div>
                    <div className="aspect-[6/2] p-4">
                      <div className="h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <FileImage className="h-12 w-12 mx-auto text-gray-400" />
                          <span className="text-sm text-gray-500 mt-2 block">Bank Statement Preview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-end space-x-3 border-t  pt-6">
                <Button
                  variant="destructive"
                  className="px-6"
                  onClick={() => console.log('Rejected')}
                >
                  Reject Application
                </Button>
                <Button
                  className="px-6 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    axios.post('http://192.168.3.7:8080/auth/roleRequestResponse',{},{ headers: { 'Content-Type': 'application/json' },withCredentials:true}).then((response) => {
                      debugger
                      toast.success('Role Approved sucessfully');
                      
      
                  }).catch((error) => {
                     
                      toast.error(error.response.data.error);
                  });
                  }}
                >
                  Accept Application
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>


      )

    },
  },
  //   {
  //     id: "actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const payment = row.original

  //       return (
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="ghost" className="h-8 w-8 p-0">
  //               <span className="sr-only">Open menu</span>
  //               <MoreHorizontal />
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent align="end">



  //             <DropdownMenuItem>Approve <Check/> </DropdownMenuItem>
  //             <DropdownMenuSeparator />
  //             <DropdownMenuItem>Reject <Ban /></DropdownMenuItem>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       )
  //     },
  //   },
]

//const data = await getUserListWithPendingApproval() // Simulate an API call to fetch user list with pending approval

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (

    <div className="h-screen flex items-center justify-center">
      <div className="w-4/5">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search by email..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {

              table.getColumn("email")?.setFilterValue(event.target.value)


            }
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2 flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
async function getUserListWithPendingApproval() {
  // Simulate an API call to fetch user list with pending approval
  return new Promise<Payment[]>((resolve,reject) => {
    axios.get('http://localhost:3000/api/users/pending-approval').then((response:Object) => {
        
        resolve(response.data.filter((user:Object)=>user.approvalStatus === 'pending'))
    }).catch((error:Object) => {
      reject(error)
    })
  });
}


