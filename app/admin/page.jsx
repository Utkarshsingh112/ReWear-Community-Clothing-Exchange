"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Recycle, Search, Check, X, Eye, Flag, Users, Package, AlertTriangle, TrendingUp, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout, getUsers } from "@/lib/auth"
import { getItems } from "@/lib/items"
import AuthGuard from "@/components/auth-guard"

function AdminContent() {
  const [user, setUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [allItems, setAllItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      // In a real app, you'd check if user has admin privileges
      if (currentUser.email !== "admin@rewear.com") {
        router.push("/dashboard")
        return
      }
    }

    // Load data
    setAllUsers(getUsers())
    setAllItems(getItems())
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Mock data for demo
  const pendingItems = allItems.filter((item) => item.status === "pending").slice(0, 3)
  const reportedItems = [] // Mock empty for now

  const adminStats = {
    totalUsers: allUsers.length,
    activeListings: allItems.filter((item) => item.status === "active").length,
    pendingApprovals: pendingItems.length,
    reportedItems: reportedItems.length,
    monthlyGrowth: 12.5,
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
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Avatar>
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
                  <p className="text-2xl font-bold text-blue-600">{adminStats.totalUsers}</p>
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
                  <p className="text-2xl font-bold text-green-600">{adminStats.activeListings}</p>
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

            {pendingItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending items</h3>
                  <p className="text-gray-600">All items have been reviewed!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.images?.[0] || "/placeholder.svg?height=100&width=100"}
                          alt={item.title}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
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
                              <p>{item.userName}</p>
                            </div>
                            <div>
                              <span className="font-medium">Upload Date:</span>
                              <p>{new Date(item.createdAt).toLocaleDateString()}</p>
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
            )}
          </TabsContent>

          {/* Reported Items Tab */}
          <TabsContent value="reported" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Reported Items</h2>

            <Card>
              <CardContent className="p-8 text-center">
                <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No reported items</h3>
                <p className="text-gray-600">No items have been reported for review.</p>
              </CardContent>
            </Card>
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
                    {allUsers.slice(0, 5).map((userData) => (
                      <TableRow key={userData.id}>
                        <TableCell className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {userData.firstName?.[0]}
                              {userData.lastName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span>
                            {userData.firstName} {userData.lastName}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(userData.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>{userData.itemsListed || 0}</TableCell>
                        <TableCell>{userData.totalSwaps || 0}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminContent />
    </AuthGuard>
  )
}
