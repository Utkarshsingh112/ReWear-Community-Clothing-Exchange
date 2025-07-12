"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Recycle, Users, Leaf, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getMockItems } from "@/lib/mock-items"

export default function LandingPage() {
  const [featuredItems, setFeaturedItems] = useState([])

  useEffect(() => {
    setFeaturedItems(getMockItems())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">ReWear</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#how-it-works" className="text-gray-600 hover:text-green-600">
              How It Works
            </Link>
            <Link href="#featured" className="text-gray-600 hover:text-green-600">
              Featured Items
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-green-600">
              Login
            </Link>
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Swap, Share, <span className="text-green-600">Sustain</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the community clothing exchange revolution. Give your unused clothes a new life while discovering
            unique pieces from others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Start Swapping <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/browse">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                Browse Items
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">10,000+</h3>
              <p className="text-gray-600">Active Members</p>
            </div>
            <div className="flex flex-col items-center">
              <Recycle className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">50,000+</h3>
              <p className="text-gray-600">Items Exchanged</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-3xl font-bold text-gray-900">25 Tons</h3>
              <p className="text-gray-600">Textile Waste Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">How ReWear Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-green-600">{step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {step === 1 && "List Your Items"}
                  {step === 2 && "Browse & Request"}
                  {step === 3 && "Exchange & Enjoy"}
                </h3>
                <p className="text-gray-600">
                  {step === 1 &&
                    "Upload photos and details of clothes you no longer wear. Set swap preferences or point values."}
                  {step === 2 &&
                    "Discover items you love and send swap requests or use points to redeem directly."}
                  {step === 3 &&
                    "Complete the exchange and enjoy your new-to-you clothing while helping the environment."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Featured Items</h2>
            <Link href="/browse">
              <Button variant="outline">
                View All Items <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={item.images[0]}
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
                    <p className="text-sm text-gray-500">Listed by {item.user}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Sustainable Fashion Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users making fashion more sustainable, one swap at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Create Account
              </Button>
            </Link>
            <Link href="/add-item">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                List an Item
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Recycle className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">Making fashion sustainable through community-driven clothing exchange.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/browse" className="hover:text-white">Browse Items</Link></li>
                <li><Link href="/add-item" className="hover:text-white">List an Item</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/safety" className="hover:text-white">Safety Guidelines</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/community" className="hover:text-white">Community Guidelines</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReWear. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
