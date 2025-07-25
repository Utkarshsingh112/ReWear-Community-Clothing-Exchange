"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Recycle, Upload, X, Plus, LogOut } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getCurrentUser, logout } from "@/lib/auth"
import { saveItem, processImages, updateItem, getItemById } from "@/lib/items"
import AuthGuard from "@/components/auth-guard"

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Footwear", "Accessories", "Activewear", "Formal"]

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size"]

const conditions = [
  { value: "like-new", label: "Like New", points: 40 },
  { value: "excellent", label: "Excellent", points: 35 },
  { value: "very-good", label: "Very Good", points: 30 },
  { value: "good", label: "Good", points: 25 },
  { value: "fair", label: "Fair", points: 20 },
]

function AddItemContent({ searchParams }) {
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "",
    size: "",
    condition: "",
    tags: [],
    currentTag: "",
  })
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItemId, setEditingItemId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }

    // Check if we're editing an existing item
    const editId = searchParams?.edit
    if (editId) {
      const existingItem = getItemById(editId)
      if (existingItem && currentUser && existingItem.userId === currentUser.id) {
        setIsEditing(true)
        setEditingItemId(editId)
        setFormData({
          title: existingItem.title || "",
          description: existingItem.description || "",
          category: existingItem.category || "",
          type: existingItem.type || "",
          size: existingItem.size || "",
          condition: existingItem.condition || "",
          tags: existingItem.tags || [],
          currentTag: "",
        })
        setImages(existingItem.images || [])
      }
    }
  }, [searchParams])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      try {
        setIsLoading(true)
        const base64Images = await processImages(files)
        setImages((prev) => [...prev, ...base64Images].slice(0, 5)) // Max 5 images
      } catch (error) {
        setError("Failed to process images")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (formData.currentTag.trim() && !formData.tags.includes(formData.currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.currentTag.trim()],
        currentTag: "",
      }))
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!user) {
        setError("You must be logged in to list an item")
        return
      }

      // Validation
      if (!formData.title || !formData.description || !formData.category || !formData.size || !formData.condition) {
        setError("Please fill in all required fields")
        return
      }

      const selectedCondition = conditions.find((c) => c.value === formData.condition)

      const itemData = {
        ...formData,
        userId: user.id,
        userName: `${user.firstName} ${user.lastName}`,
        userEmail: user.email,
        images: images,
        points: selectedCondition?.points || 20,
      }

      let savedItem
      if (isEditing && editingItemId) {
        savedItem = updateItem(editingItemId, itemData)
        setSuccess("Item updated successfully!")
      } else {
        savedItem = saveItem(itemData)
        setSuccess("Item listed successfully!")
      }

      if (savedItem) {
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }
    } catch (err) {
      setError("An error occurred while saving your item")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCondition = conditions.find((c) => c.value === formData.condition)

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
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{isEditing ? "Edit Item" : "List a New Item"}</h1>
          <p className="text-gray-600">
            {isEditing ? "Update your item details" : "Share your unused clothing with the ReWear community"}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>
                Add up to 5 photos of your item. The first photo will be the main image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={images.length >= 5}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`cursor-pointer ${images.length >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {images.length >= 5 ? "Maximum 5 images reached" : "Click to upload photos"}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {/* Image Preview */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        {index === 0 && <Badge className="absolute bottom-2 left-2 bg-green-600">Main</Badge>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide details about your item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Vintage Denim Jacket"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail - condition, fit, style, etc."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Jacket, Shirt, Sneakers"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size} value={size.toLowerCase()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label} ({condition.points} points)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCondition && (
                    <p className="text-sm text-gray-600">
                      This condition will earn you {selectedCondition.points} points when swapped
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>Add tags to help others find your item</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag (e.g., vintage, casual, designer)"
                    value={formData.currentTag}
                    onChange={(e) => handleInputChange("currentTag", e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                        <span>#{tag}</span>
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Points Preview */}
          {selectedCondition && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">Estimated Points Value</h3>
                    <p className="text-sm text-green-600">Based on condition and category</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{selectedCondition.points}</p>
                    <p className="text-sm text-green-600">points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-8"
              disabled={
                isLoading ||
                !formData.title ||
                !formData.description ||
                !formData.category ||
                !formData.size ||
                !formData.condition
              }
            >
              {isLoading
                ? isEditing
                  ? "Updating Item..."
                  : "Listing Item..."
                : isEditing
                  ? "Update Item"
                  : "List Item"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AddItemPage({ searchParams }) {
  return (
    <AuthGuard>
      <AddItemContent searchParams={searchParams} />
    </AuthGuard>
  )
}
