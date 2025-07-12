"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Recycle,
  Star,
  MapPin,
  Calendar,
  ArrowUpDown,
  Heart,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Eye,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, logout } from "@/lib/auth"
import { getItemById, incrementItemViews, toggleItemLike, getItems } from "@/lib/items"

export default function ItemDetailPage({ params }) {
  const { id: itemId } = React.use(params)
  const [user, setUser] = useState(null)
  const [item, setItem] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [relatedItems, setRelatedItems] = useState([])
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)

    if (!itemId) {
      setError("Item not found")
      setLoading(false)
      return
    }

    // Load item data
    const itemData = getItemById(itemId)
    if (!itemData) {
      setError("Item not found")
      setLoading(false)
      return
    }

    setItem(itemData)

    // Check if user has liked this item
    if (currentUser && itemData.likedBy) {
      setIsLiked(itemData.likedBy.includes(currentUser.id))
    }

    // Increment view count
    incrementItemViews(itemId)

    // Load related items (same category, different user)
    const allItems = getItems()
    const related = allItems
      .filter(
        (i) =>
          i.id !== itemId && i.category === itemData.category && i.userId !== itemData.userId && i.status === "active",
      )
      .slice(0, 4)
    setRelatedItems(related)

    setLoading(false)
  }, [itemId])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const nextImage = () => {
    if (item?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length)
    }
  }

  const prevImage = () => {
    if (item?.images?.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length)
    }
  }

  const handleLike = () => {
    if (!user) {
      router.push("/login")
      return
    }

    const updatedItem = toggleItemLike(item.id, user.id)
    if (updatedItem) {
      setItem(updatedItem)
      setIsLiked(!isLiked)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading item...</p>
        </div>
      </div>
    )
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Recycle className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">ReWear</span>
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button className="bg-green-600 hover:bg-green-700">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertDescription>{error || "Item not found"}</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Link href="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

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
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
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
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/browse" className="hover:text-green-600">
              Browse
            </Link>
            <span>/</span>
            <span className="text-gray-900">{item.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              {item.images && item.images.length > 0 ? (
                <>
                  <Image
                    src={item.images[currentImageIndex] || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={600}
                    className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
                  />
                  {item.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                        {currentImageIndex + 1} / {item.images.length}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-96 lg:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {item.images && item.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {item.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden ${
                      index === currentImageIndex ? "ring-2 ring-green-600" : ""
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${item.title} ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Listed {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views || 0} views
                    </span>
                    <span>{item.likes || 0} likes</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={handleLike} className={isLiked ? "text-red-600" : ""}>
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-600">{item.points} Points</Badge>
                <Badge variant="outline">{item.condition}</Badge>
                <Badge
                  variant={item.status === "active" ? "default" : "secondary"}
                  className={item.status === "active" ? "bg-green-100 text-green-800" : ""}
                >
                  {item.status}
                </Badge>
              </div>

              <p className="text-gray-700 leading-relaxed">{item.description}</p>
            </div>

            {/* Item Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Item Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Category:</span>
                    <p className="capitalize">{item.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <p>{item.type || "Not specified"}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Size:</span>
                    <p className="uppercase">{item.size}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Condition:</span>
                    <p className="capitalize">{item.condition?.replace("-", " ")}</p>
                  </div>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-4">
                    <span className="font-medium text-gray-600">Tags:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            {user && user.id !== item.userId && (
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                  <ArrowUpDown className="h-5 w-5 mr-2" />
                  Send Swap Request
                </Button>
                <Button variant="outline" className="w-full text-lg py-3 bg-transparent">
                  <Star className="h-5 w-5 mr-2" />
                  Redeem with {item.points} Points
                </Button>
              </div>
            )}

            {/* Owner can't swap with themselves */}
            {user && user.id === item.userId && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">This is your item. You can edit it from your dashboard.</p>
                <Link href="/dashboard">
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            )}

            {/* Not logged in */}
            {!user && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 text-sm mb-2">Sign in to swap or redeem this item</p>
                <Link href="/login">
                  <Button className="bg-green-600 hover:bg-green-700">Sign In</Button>
                </Link>
              </div>
            )}

            {/* Uploader Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Listed by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {item.userName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.userName || "Anonymous User"}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        5.0
                      </span>
                      <span>0 swaps</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      Location not specified
                    </p>
                  </div>
                  <Button variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedItems.map((relatedItem) => (
                <Link key={relatedItem.id} href={`/item/${relatedItem.id}`}>
                  <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-0">
                      <div className="relative">
                        <Image
                          src={relatedItem.images?.[0] || "/placeholder.svg?height=200&width=200"}
                          alt={relatedItem.title}
                          width={200}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-600">{relatedItem.points} pts</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">
                          {relatedItem.title}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span className="capitalize">{relatedItem.category}</span>
                          <span className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {relatedItem.condition?.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
