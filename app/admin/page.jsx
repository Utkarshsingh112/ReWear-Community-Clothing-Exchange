"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Recycle, Search, Check, X, Eye, Flag, Users, Package, AlertTriangle, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const pendingItems = [
  {
    id: 1,
    title: "Designer Leather Handbag",
    category: "Accessories",
    condition: "Excellent",
    uploader: "Emma Wilson",
    uploadDate: "2024-01-22",
    status: "pending",
    image: "/placeholder.svg?height=100&width=100",
    flagged: false,
  },
  {
    id: 2,
    title: "Vintage Band T-Shirt",
    category: "Tops",
    condition: "Good",
    uploader: "Mike Chen",
    uploadDate: "2024-01-21",
    status: "pending",
    image: "/placeholder.svg?height=100&width=100",
    flagged: true,
  },
  {
    id: 3,
    title: "Athletic Running Shoes",
    category: "Footwear",
    condition: "Very Good",
    uploader: "Sarah Johnson",
    uploadDate: "2024-01-20",
    status: "pending",
    image: "/placeholder.svg?height=100&width=100",
    flagged: false,
  },
]

const reportedItems = [
  {
    id: 4,
    title: "Suspicious Designer Bag",
    category: "Accessories",
    uploader: "Unknown User",
    reportReason: "Suspected counterfeit",
    reportDate: "2024-01-19",
    reportCount: 3,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    title: "Inappropriate Content",
    category: "Tops",
    uploader: "Spam Account",
    reportReason: "Inappropriate images",
    reportDate: "2024-01-18",
    reportCount: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const adminStats = {
  totalUsers: 10247,
  activeListings: 3456,
  pendingApprovals: 23,
  reportedItems: 7,
  monthlyGrowth: 12.5,
}

export default function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleApprove = (itemId) => {
    console.log(`Approved item ${itemId}`)
    // In real app, make API call to approve item
  }

  const handleReject = (itemId) => {
    console.log(`Rejected item ${itemId}`)
    // In real app, make API call to reject item
  }

  const handleRemoveReported = (itemId) => {
    console.log(`Removed reported item ${itemId}`)
    // In real app, make API call to remove item
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </Link>
            <Badge className="bg-red-600">Admin Panel</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">User Dashboard</Button>
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage and moderate the ReWear platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">{adminStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-2xl font-bold text-green-600">{adminStats.activeListings.toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-yellow-600">{adminStats.pendingApprovals}</p>
                </div>
                <Eye className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Reported Items</p>
                  <p className="text-2xl font-bold text-red-600">{adminStats.reportedItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
                  <p className="text-2xl font-bold text-purple-600">+{adminStats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending Approvals ({pendingItems.length})</TabsTrigger>
            <TabsTrigger value="reported">Reported Items ({reportedItems.length})</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          {/* Pending Approvals Tab */}
          <TabsContent value="pending" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Items Pending Approval</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>

            <div className="space-y-4">
              {pendingItems.map((item) => (
                <Card key={item.id} className={`${item.flagged ? "border-red-200 bg-red-50" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          {item.flagged && (
                            <Badge variant="destructive" className="flex items-center space-x-1">
                              <Flag className="h-3 w-3" />
                              <span>Flagged</span>
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Category:</span>
                            <p>{item.category}</p>
                          </div>
                          <div>
                            <span className="font-medium">Condition:</span>
                            <p>{item.condition}</p>
                          </div>
                          <div>
                            <span className="font-medium">Uploader:</span>
                            <p>{item.uploader}</p>
                          </div>
                          <div>
                            <span className="font-medium">Upload Date:</span>
                            <p>{item.uploadDate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="flex items-center space-x-1 bg-transparent">
                          <Eye className="h-4 w-4" />
                          <span>View Details</span>
                        </Button>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleApprove(item.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleReject(item.id)}>
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reported Items Tab */}
          <TabsContent value="reported" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Reported Items</h2>

            <div className="space-y-4">
              {reportedItems.map((item) => (
                <Card key={item.id} className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge variant="destructive">{item.reportCount} reports</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Category:</span>
                            <p>{item.category}</p>
                          </div>
                          <div>
                            <span className="font-medium">Uploader:</span>
                            <p>{item.uploader}</p>
                          </div>
                          <div>
                            <span className="font-medium">Report Reason:</span>
                            <p className="text-red-600">{item.reportReason}</p>
                          </div>
                          <div>
                            <span className="font-medium">Report Date:</span>
                            <p>{item.reportDate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="flex items-center space-x-1 bg-transparent">
                          <Eye className="h-4 w-4" />
                          <span>Investigate</span>
                        </Button>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="destructive" onClick={() => handleRemoveReported(item.id)}>
                            <X className="h-4 w-4 mr-1" />
                            Remove Item
                          </Button>
                          <Button size="sm" variant="outline">
                            Dismiss Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>

            <Card>
              <CardHeader>
                <CardTitle>Recent User Activity</CardTitle>
                <CardDescription>Overview of user registrations and activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Items Listed</TableHead>
                      <TableHead>Swaps Completed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>SJ</AvatarFallback>
                        </Avatar>
                        <span>Sarah Johnson</span>
                      </TableCell>
                      <TableCell>2024-01-15</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>23</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>EW</AvatarFallback>
                        </Avatar>
                        <span>Emma Wilson</span>
                      </TableCell>
                      <TableCell>2024-01-10</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>15</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <span>Mike Chen</span>
                      </TableCell>
                      <TableCell>2024-01-08</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>7</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
