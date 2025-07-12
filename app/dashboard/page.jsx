"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Recycle, Plus, Star, Package, ArrowUpDown, CheckCircle, Clock, Eye, Edit, Trash2, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import { getUserItems, deleteItem } from "@/lib/items"
import AuthGuard from "@/components/auth-guard"

function DashboardContent() {
  const [user, setUser] = useState(null)
  const [userItems, setUserItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      const items = getUserItems(currentUser.id)
      setUserItems(items)
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleDeleteItem = (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(itemId)
      const items = getUserItems(user.id)
      setUserItems(items)
    }
  }

  const handleEditItem = (itemId) => {
    router.push(`/add-item?edit=${itemId}`)
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

  const swapHistory = [
    {
      id: 1,
      type: "outgoing",
      item: "Designer Silk Scarf",
      partner: "Emma Wilson",
      status: "completed",
      date: "2024-01-15",
      points: 20,
    },
    {
      id: 2,
      type: "incoming",
      item: "Wool Winter Sweater",
      partner: "Mike Chen",
      status: "in-progress",
      date: "2024-01-10",
      points: 40,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/add-item">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                List Item
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            <Avatar>
              <AvatarFallback>
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName} {user.lastName}!
          </h1>
          <p className="text-gray-600">Here's what's happening with your ReWear account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ReWear Points</p>
                  <p className="text-2xl font-bold text-green-600">{user.points || 0}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Items Listed</p>
                  <p className="text-2xl font-bold text-blue-600">{userItems.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Swaps</p>
                  <p className="text-2xl font-bold text-purple-600">{user.totalSwaps || 0}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <ArrowUpDown className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{user.rating || 5.0}/5</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="items">My Items</TabsTrigger>
            <TabsTrigger value="swaps">Swap History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* My Items Tab */}
          <TabsContent value="items" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Listed Items</h2>
              <Link href="/add-item">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </Link>
            </div>

            {userItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No items listed yet</h3>
                  <p className="text-gray-600 mb-4">Start by listing your first item to begin swapping!</p>
                  <Link href="/add-item">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      List Your First Item
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userItems.map((item) => (
                  <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Link href={`/item/${item.id}`}>
                          <Image
                            src={item.images?.[0] || "/placeholder.svg?height=200&width=200"}
                            alt={item.title}
                            width={200}
                            height={200}
                            className="w-full h-48 object-cover rounded-t-lg cursor-pointer hover:opacity-90 transition-opacity"
                          />
                        </Link>
                        <Badge
                          className={`absolute top-2 right-2 ${
                            item.status === "active"
                              ? "bg-green-600"
                              : item.status === "pending"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <Link href={`/item/${item.id}`}>
                          <h3 className="font-semibold text-lg mb-2 hover:text-green-600 transition-colors cursor-pointer">
                            {item.title}
                          </h3>
                        </Link>
                        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                          <span className="capitalize">{item.category}</span>
                          <span>{item.points} pts</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {item.views || 0} views
                          </span>
                          <span className="capitalize">{item.condition?.replace("-", " ")}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => handleEditItem(item.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Swap History Tab */}
          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Swap History</h2>

            {swapHistory.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ArrowUpDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No swaps yet</h3>
                  <p className="text-gray-600">Your swap history will appear here once you start trading!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {swapHistory.map((swap) => (
                  <Card key={swap.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${
                              swap.status === "completed" ? "bg-green-100" : "bg-yellow-100"
                            }`}
                          >
                            {swap.status === "completed" ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold">{swap.item}</h3>
                            <p className="text-sm text-gray-600">
                              {swap.type === "outgoing" ? "Swapped with" : "Received from"} {swap.partner}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={swap.status === "completed" ? "default" : "secondary"}>{swap.status}</Badge>
                          <p className="text-sm text-gray-500 mt-1">{swap.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="text-lg">
                        {user.firstName?.[0]}
                        {user.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {user.firstName} {user.lastName}
                      </h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-500">
                        Member since {new Date(user.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Statistics</CardTitle>
                  <CardDescription>Your ReWear journey so far</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Swap Success Rate</span>
                      <span>83%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span>90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{user.rating || 5.0}</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{user.successfulSwaps || 0}</p>
                      <p className="text-sm text-gray-600">Successful Swaps</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
