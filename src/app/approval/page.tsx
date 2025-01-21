'use client'
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
import { ArrowUpDown, ChevronDown, CreditCard, FileImage, FileText, Search, Target, User, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { Eye } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { set } from "react-hook-form"

let data: Payment[] = [
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

//let data: Payment[] = []

export type Payment = {
  id: string
  role: string
  username: string
  email: string
}

// export const columns: ColumnDef<Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "username",
//     header: "Username",
//     id: "username",
//     cell: ({ row }) => (
//       <div className="font-medium text-foreground">{row.getValue("username")}</div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     id: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="hover:bg-secondary/50"
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "role",
//     id: "role",
//     cell: ({ row }) => (
//       <div className="flex items-center">
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//           row.getValue("role") === "Investor" 
//             ? "bg-blue-500/20 text-blue-400"
//             : "bg-purple-500/20 text-purple-400"
//         }`}>
//           {row.getValue("role")}
//         </span>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "",
//     id: "Actions",
//     header: () => <div className="text-left">Actions</div>,
//     cell: ({ row }) => {
//       return (
//         <Dialog>
//           <DialogTrigger asChild>
//             <Button 
//               variant="ghost" 
//               className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-colors duration-200"
//             >
//               <Eye className="h-4 w-4" />
//               <span className="sr-only">View details</span>
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto custom-dialog">
//             <DialogHeader>
//               <DialogTitle className="text-3xl font-bold text-center pb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//                 Investor Profile Preview
//               </DialogTitle>
//             </DialogHeader>

//             <div className="space-y-8">
//               <div className="grid grid-cols-2 gap-8">
//                 {/* Left Column */}
//                 <div className="space-y-6">
//                   <div className="custom-card rounded-xl p-6">
//                     <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
//                       <User className="h-5 w-5 text-blue-400" />
//                       <Label className="text-lg font-semibold text-foreground">Personal Information</Label>
//                     </div>

//                     <div className="grid gap-4 mt-4">
//                       <div className="flex items-center">
//                         <Label className="w-1/3 text-muted-foreground">Name:</Label>
//                         <span className="flex-1 font-medium text-foreground">Siddartha Kumar</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Label className="w-1/3 text-muted-foreground">Email:</Label>
//                         <span className="flex-1 font-medium text-foreground">test@gmail.com</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="custom-card rounded-xl p-6">
//                     <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
//                       <Target className="h-5 w-5 text-purple-400" />
//                       <Label className="text-lg font-semibold text-foreground">Investment Focus</Label>
//                     </div>

//                     <div className="grid gap-4 mt-4">
//                       <div className="flex items-center">
//                         <Label className="w-1/3 text-muted-foreground">Sector:</Label>
//                         <span className="flex-1 font-medium text-foreground">IT Industry</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Label className="w-1/3 text-muted-foreground">Specifics:</Label>
//                         <span className="flex-1 font-medium text-foreground">Banking & Arms</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column */}
//                 <div className="space-y-6">
//                   <div className="custom-card rounded-xl p-6">
//                     <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
//                       <Wallet className="h-5 w-5 text-blue-400" />
//                       <Label className="text-lg font-semibold text-foreground">Investment Details</Label>
//                     </div>

//                     <div className="grid gap-4 mt-4">
//                       <div className="flex items-center">
//                         <Label className="w-1/3 text-muted-foreground">Budget:</Label>
//                         <span className="flex-1 font-medium text-green-400">$700,000</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Label className="w-1/3 text-muted-foreground">Experience:</Label>
//                         <span className="flex-1 font-medium text-foreground">5 Years</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="custom-card rounded-xl p-6">
//                     <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
//                       <FileText className="h-5 w-5 text-purple-400" />
//                       <Label className="text-lg font-semibold text-foreground">About</Label>
//                     </div>

//                     <div className="mt-4">
//                       <p className="text-muted-foreground leading-relaxed">
//                         Serial entrepreneur turned angel investor with a strong focus on fintech innovations
//                         and AI/ML applications. Looking for disruptive early-stage startups with strong
//                         technical foundations.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Document Preview Section */}
//               <div className="border-t border-white/10 pt-6">
//                 <h3 className="text-xl font-semibold text-foreground mb-6">Verification Documents</h3>
//                 <div className="grid grid-cols-2 gap-8">
//                   {/* Tax Return Preview */}
//                   <div className="custom-card rounded-xl overflow-hidden">
//                     <div className="bg-blue-500/10 px-6 py-3 border-b border-white/10">
//                       <div className="flex items-center space-x-2">
//                         <FileImage className="h-5 w-5 text-blue-400" />
//                         <Label className="font-medium text-blue-400">Tax Return</Label>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="aspect-[6/2] bg-secondary/50 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center">
//                         <div className="text-center">
//                           <FileImage className="h-12 w-12 mx-auto text-muted-foreground" />
//                           <span className="text-sm text-muted-foreground mt-2 block">Tax Return Preview</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Bank Statement Preview */}
//                   <div className="custom-card rounded-xl overflow-hidden">
//                     <div className="bg-purple-500/10 px-6 py-3 border-b border-white/10">
//                       <div className="flex items-center space-x-2">
//                         <CreditCard className="h-5 w-5 text-purple-400" />
//                         <Label className="font-medium text-purple-400">Bank Statement</Label>
//                       </div>
//                     </div>
//                     <div className="p-6">
//                       <div className="aspect-[6/2] bg-secondary/50 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center">
//                         <div className="text-center">
//                           <FileImage className="h-12 w-12 mx-auto text-muted-foreground" />
//                           <span className="text-sm text-muted-foreground mt-2 block">Bank Statement Preview</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <DialogFooter className="flex justify-end space-x-4 border-t border-white/10 pt-6">
//                 <Button
//                   variant="destructive"
//                   className="px-8 py-2 hover:bg-red-600/90 transition-colors duration-200"
//                   onClick={() => {
                    
//                   }}
//                 >
//                   Reject Application
//                 </Button>
//                 <Button
//                   className="px-8 py-2 gradient-button text-white"
//                   onClick={() => {
//                     axios.post('http://192.168.3.7:8080/auth/roleRequestResponse', {}, { 
//                       headers: { 'Content-Type': 'application/json' },
//                       withCredentials: true
//                     }).then(() => {

//                       toast.success('Role Approved successfully');
//                     }).catch((error) => {
//                       toast.error(error.response.data.error);
//                     });
//                   }}
//                 >
//                   Accept Application
//                 </Button>
//               </DialogFooter>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )
//     },
//   },
// ]

let columns : ColumnDef<Payment>[] = []

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const [takenAction,setTakenAction] = React.useState(false);

  columns = [
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
          <div className="font-medium text-foreground">{row.getValue("username")}</div>
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
              className="hover:bg-secondary/50"
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("email")}</div>,
      },
      {
        accessorKey: "role",
        id: "role",
        cell: ({ row }) => (
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              row.getValue("role") === "Investor" 
                ? "bg-blue-500/20 text-blue-400"
                : "bg-purple-500/20 text-purple-400"
            }`}>
              {row.getValue("role")}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "",
        id: "Actions",
        header: () => <div className="text-left">Actions</div>,
        cell: ({ row }) => {
          return (
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0 hover:bg-primary/20 hover:text-primary transition-colors duration-200"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto custom-dialog">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-bold text-center pb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Investor Profile Preview
                  </DialogTitle>
                </DialogHeader>
    
                <div className="space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="custom-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                          <User className="h-5 w-5 text-blue-400" />
                          <Label className="text-lg font-semibold text-foreground">Personal Information</Label>
                        </div>
    
                        <div className="grid gap-4 mt-4">
                          <div className="flex items-center">
                            <Label className="w-1/3 text-muted-foreground">Name:</Label>
                            <span className="flex-1 font-medium text-foreground">Siddartha Kumar</span>
                          </div>
                          <div className="flex items-center">
                            <Label className="w-1/3 text-muted-foreground">Email:</Label>
                            <span className="flex-1 font-medium text-foreground">test@gmail.com</span>
                          </div>
                        </div>
                      </div>
    
                      <div className="custom-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                          <Target className="h-5 w-5 text-purple-400" />
                          <Label className="text-lg font-semibold text-foreground">Investment Focus</Label>
                        </div>
    
                        <div className="grid gap-4 mt-4">
                          <div className="flex items-center">
                            <Label className="w-1/3 text-muted-foreground">Sector:</Label>
                            <span className="flex-1 font-medium text-foreground">IT Industry</span>
                          </div>
                          <div className="flex items-center">
                            <Label className="w-1/3 text-muted-foreground">Specifics:</Label>
                            <span className="flex-1 font-medium text-foreground">Banking & Arms</span>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="custom-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                          <Wallet className="h-5 w-5 text-blue-400" />
                          <Label className="text-lg font-semibold text-foreground">Investment Details</Label>
                        </div>
    
                        <div className="grid gap-4 mt-4">
                          <div className="flex items-center">
                            <Label className="w-1/3 text-muted-foreground">Budget:</Label>
                            <span className="flex-1 font-medium text-green-400">$700,000</span>
                          </div>
                          <div className="flex items-center">
                            <Label className="w-1/3 text-muted-foreground">Experience:</Label>
                            <span className="flex-1 font-medium text-foreground">5 Years</span>
                          </div>
                        </div>
                      </div>
    
                      <div className="custom-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 pb-4 border-b border-white/10">
                          <FileText className="h-5 w-5 text-purple-400" />
                          <Label className="text-lg font-semibold text-foreground">About</Label>
                        </div>
    
                        <div className="mt-4">
                          <p className="text-muted-foreground leading-relaxed">
                            Serial entrepreneur turned angel investor with a strong focus on fintech innovations
                            and AI/ML applications. Looking for disruptive early-stage startups with strong
                            technical foundations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  {/* Document Preview Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="text-xl font-semibold text-foreground mb-6">Verification Documents</h3>
                    <div className="grid grid-cols-2 gap-8">
                      {/* Tax Return Preview */}
                      <div className="custom-card rounded-xl overflow-hidden">
                        <div className="bg-blue-500/10 px-6 py-3 border-b border-white/10">
                          <div className="flex items-center space-x-2">
                            <FileImage className="h-5 w-5 text-blue-400" />
                            <Label className="font-medium text-blue-400">Tax Return</Label>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="aspect-[6/2] bg-secondary/50 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center">
                            <div className="text-center">
                              <FileImage className="h-12 w-12 mx-auto text-muted-foreground" />
                              <span className="text-sm text-muted-foreground mt-2 block">Tax Return Preview</span>
                            </div>
                          </div>
                        </div>
                      </div>
    
                      {/* Bank Statement Preview */}
                      <div className="custom-card rounded-xl overflow-hidden">
                        <div className="bg-purple-500/10 px-6 py-3 border-b border-white/10">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5 text-purple-400" />
                            <Label className="font-medium text-purple-400">Bank Statement</Label>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="aspect-[6/2] bg-secondary/50 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center">
                            <div className="text-center">
                              <FileImage className="h-12 w-12 mx-auto text-muted-foreground" />
                              <span className="text-sm text-muted-foreground mt-2 block">Bank Statement Preview</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    
                  <DialogFooter className="flex justify-end space-x-4 border-t border-white/10 pt-6">
                    <Button
                      variant="destructive"
                      className="px-8 py-2 hover:bg-red-600/90 transition-colors duration-200"
                      onClick={() => {
                        setTakenAction(true);
                      }}
                    >
                      Reject Application
                    </Button>
                    <Button
                      className="px-8 py-2 gradient-button text-white"
                      onClick={() => {
                        axios.post('http://localhost:8080/admin/roleRequestResponse', JSON.stringify({approvalStatus:'approved'}), { 
                          headers: { 'Content-Type': 'application/json' },
                          withCredentials: true
                        }).then(() => {
                          setTakenAction(true);
                          toast.success('Role Approved successfully');
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
  ]

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

  React.useEffect(() => {
    const fetchData = async () => {
      // Your async code here
      debugger
      try {
        const response = await axios.get(
            'https://localhost:8000/admin/roleRequests', 
            { 
              headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error('Error during the request:', error);
    }
    
    };
    fetchData();
  }, [takenAction])

  return (
    <div className="h-screen bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-background p-8 flex-col flex justify-center items-center gap-5 md:gap-10">
      <ToastContainer theme="dark" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
     
      <div className="max-w-7xl mx-auto w-full">
        <div className="custom-card rounded-xl p-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Pending Approvals
          </h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by email..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                className="pl-10 w-[300px] custom-input"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto border-white/10 hover:bg-secondary/50">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[150px]">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-lg border border-white/10 overflow-hidden">
            <Table className="custom-table">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="hover:bg-secondary/30 border-b border-white/10">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-muted-foreground font-medium">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-secondary/40 transition-colors duration-200 border-b border-white/10"
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
                      className="h-24 text-center text-muted-foreground"
                    >
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2 flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="border-white/10 hover:bg-secondary/50 disabled:opacity-50"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="border-white/10 hover:bg-secondary/50 disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



