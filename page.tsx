"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const featuredActivities = [
  { title: "Robotics Team", category: "STEM", popularity: "High" },
  { title: "Debate Club", category: "Academic", popularity: "Rising" },
  { title: "Environmental Club", category: "Service", popularity: "Trending" },
  { title: "Student Government", category: "Leadership", popularity: "Popular" },
]

const interestCategories = [
  { emoji: "🔬", title: "STEM & Innovation", count: "45+ activities" },
  { emoji: "🎭", title: "Arts & Creative", count: "32+ activities" },
  { emoji: "🏆", title: "Leadership & Service", count: "28+ activities" },
  { emoji: "💼", title: "Business & Finance", count: "21+ activities" },
  { emoji: "🌍", title: "Global & Cultural", count: "19+ activities" },
  { emoji: "⚽", title: "Sports & Wellness", count: "35+ activities" },
]

export default function HomePage() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b border-emerald-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">✨</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                ActivityHub
              </span>
            </div>
            <Link href="/finder">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg">
                Explore Now
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl transform -rotate-12 scale-150"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Unlock Your Potential
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Through Action
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover meaningful opportunities that align with your passions and accelerate your growth journey
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/finder">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 text-lg shadow-xl"
                >
                  Start Exploring
                  <span className="ml-2">⚡</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-8 py-4 text-lg bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Activities Carousel */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Opportunities</h2>
            <p className="text-lg text-gray-600">See what's capturing students' attention right now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredActivities.map((activity, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                      {activity.category}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <span className="text-emerald-500">📈</span>
                      <span className="text-sm text-emerald-600 font-medium">{activity.popularity}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{activity.title}</h3>
                  <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 p-0">
                    Learn more →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interest Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Sparks Your Curiosity?</h2>
            <p className="text-lg text-gray-600">Explore activities by your areas of interest</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interestCategories.map((category, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all duration-300 border-0 ${
                  hoveredCategory === index
                    ? "shadow-2xl scale-105 bg-gradient-to-br from-emerald-50 to-teal-50"
                    : "hover:shadow-lg bg-white"
                }`}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{category.emoji}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-emerald-600 font-medium">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Students Choose ActivityHub</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
              <p className="text-emerald-100">
                Advanced filters help you find activities that perfectly align with your interests and goals
              </p>
            </div>

            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-emerald-100">
                Real reviews and insights from students who've been there and done that
              </p>
            </div>

            <div className="text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Quality</h3>
              <p className="text-emerald-100">
                Every opportunity is vetted to ensure it provides real value and growth potential
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your High School Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who've discovered their passion through ActivityHub
          </p>
          <Link href="/finder">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-12 py-4 text-lg shadow-xl"
            >
              Begin Your Journey
              <span className="ml-2">→</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white">✨</span>
              </div>
              <span className="text-xl font-bold">ActivityHub</span>
            </div>
            <p className="text-gray-400">
              Empowering students to discover their potential through meaningful activities
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
