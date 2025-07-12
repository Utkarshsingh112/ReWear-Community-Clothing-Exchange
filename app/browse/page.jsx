"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getItems } from "@/lib/items"
import { getMockItems } from "@/lib/mock-items"

export default function BrowseItemsPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const realItems = getItems()
    const mockItems = getMockItems()
    setItems([...realItems, ...mockItems])
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">All Items</h1>
        {items.length === 0 ? (
          <div className="text-center text-gray-600">No items found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Link key={item.id} href={`/item/${item.id}`}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={item.images?.[0] || "/placeholder.svg?height=300&width=300"}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-600">{item.points} pts</Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                        <span>{item.category}</span>
                        <span className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          {item.condition}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Listed by {item.userName || item.user || "Unknown"}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
