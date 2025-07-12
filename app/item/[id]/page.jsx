"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const itemData = {
  id: 1,
  title: "Vintage Denim Jacket",
  description:
    "Beautiful vintage denim jacket in excellent condition. This classic piece has been well-maintained and shows minimal signs of wear. Perfect for layering and adding a timeless touch to any outfit. Features original brass buttons and classic fit.",
  category: "Outerwear",
  type: "Jacket",
  size: "Medium",
  condition: "Excellent",
  points: 25,
  tags: ["vintage", "denim", "classic", "unisex"],
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  uploader: {
    name: "Sarah Johnson",
    rating: 4.8,
    totalSwaps: 23,
    joinDate: "March 2024",
    location: "San Francisco, CA",
    avatar: "/placeholder-user.jpg",
  },
  availability: "available",
  listedDate: "2024-01-20",
  views: 45,
  likes: 12,
}

export default function ItemDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % itemData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + itemData.images.length) % itemData.images.length)
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
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
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
            <span className="text-gray-900">{itemData.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={itemData.images[currentImageIndex] || "/placeholder.svg"}
                alt={itemData.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
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
                {currentImageIndex + 1} / {itemData.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {itemData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden ${
                    index === currentImageIndex ? "ring-2 ring-green-600" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${itemData.title} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{itemData.title}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Listed {itemData.listedDate}
                    </span>
                    <span>{itemData.views} views</span>
                    <span>{itemData.likes} likes</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-600" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-green-600">{itemData.points} Points</Badge>
                <Badge variant="outline">{itemData.condition}</Badge>
                <Badge
                  variant={itemData.availability === "available" ? "default" : "secondary"}
                  className={itemData.availability === "available" ? "bg-green-100 text-green-800" : ""}
                >
                  {itemData.availability}
                </Badge>
              </div>

              <p className="text-gray-700 leading-relaxed">{itemData.description}</p>
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
                    <p>{itemData.category}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Type:</span>
                    <p>{itemData.type}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Size:</span>
                    <p>{itemData.size}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Condition:</span>
                    <p>{itemData.condition}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-medium text-gray-600">Tags:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {itemData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                <ArrowUpDown className="h-5 w-5 mr-2" />
                Send Swap Request
              </Button>
              <Button variant="outline" className="w-full text-lg py-3 bg-transparent">
                <Star className="h-5 w-5 mr-2" />
                Redeem with {itemData.points} Points
              </Button>
            </div>

            {/* Uploader Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Listed by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={itemData.uploader.avatar || "/placeholder.svg"} />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{itemData.uploader.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {itemData.uploader.rating}
                      </span>
                      <span>{itemData.uploader.totalSwaps} swaps</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {itemData.uploader.location}
                    </p>
                  </div>
                  <Button variant="outline">View Profile</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Items */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Similar item"
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">20 pts</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-green-600 transition-colors">
                      Similar Denim Item
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>Outerwear</span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        Excellent
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
