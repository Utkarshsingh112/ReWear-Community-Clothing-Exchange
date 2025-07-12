"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Recycle, Plus, Star, Package, ArrowUpDown, CheckCircle, Clock, Eye, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const userStats = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  points: 125,
  totalSwaps: 23,
  itemsListed: 8,
  successfulSwaps: 19,
  rating: 4.8,
  joinDate: "March 2024",
}

const userItems = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    category: "Outerwear",
    condition: "Excellent",
    points: 25,
    status: "active",
    views: 45,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    title: "Summer Floral Dress",
    category: "Dresses",
    condition: "Like New",
    points: 30,
    status: "pending",
    views: 23,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    title: "Leather Ankle Boots",
    category: "Footwear",
    condition: "Good",
    points: 35,
    status: "swapped",
    views: 67,
    image: "/placeholder.svg?height=200&width=200",
  },
]

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
  {
    id: 3,
    type: "outgoing",
    item: "Athletic Sneakers",
    partner: "Lisa Park",
    status: "completed",
    date: "2024-01-05",
    points: 25,
  },
]

export default function DashboardPage() {
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
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userStats.name}!</h1>
          <p className="text-gray-600">Here's what's happening with your ReWear account</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ReWear Points</p>
                  <p className="text-2xl font-bold text-green-600">{userStats.points}</p>
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
                  <p className="text-2xl font-bold text-blue-600">{userStats.itemsListed}</p>
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
                  <p className="text-2xl font-bold text-purple-600">{userStats.totalSwaps}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{userStats.rating}/5</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
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
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                        <span>{item.category}</span>
                        <span>{item.points} pts</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {item.views} views
                        </span>
                        <span>{item.condition}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Swap History Tab */}
          <TabsContent value="swaps" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Swap History</h2>

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
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{userStats.name}</h3>
                      <p className="text-gray-600">{userStats.email}</p>
                      <p className="text-sm text-gray-500">Member since {userStats.joinDate}</p>
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
                      <p className="text-2xl font-bold text-green-600">{userStats.rating}</p>
                      <p className="text-sm text-gray-600">Average Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{userStats.successfulSwaps}</p>
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
