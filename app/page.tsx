"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Code, Brain, BookOpen, Trophy, Star, CheckCircle } from "lucide-react"

const topics = {
  1: ["Time and Work", "Time, Speed and Distance", "Permutations and Combinations"],
  2: ["Percentage", "Numbers", "Average"],
  3: ["Profit and Loss", "Ratio and Proportion", "Mixtures"],
  4: ["Probability", "Simple Interest", "Compound Interest"],
  5: ["HCF and LCM", "Divisibility Rules", "Boats and Streams"],
  6: ["Pipes and Cisterns", "Partnership", "Problems on Trains"],
  7: ["Calendar Problems", "Clocks", "Ages"],
  8: ["Area and Volume", "Data Interpretation", "Mensuration"],
  9: ["Simplification", "Surds and Indices", "Logarithms"],
  10: ["Square Roots", "Cube Roots", "All Previous Topics Revision"],
  11: ["JavaScript Basics", "Variables & Data Types", "Functions & Scope"],
  12: ["Arrays & Objects", "DOM Manipulation", "Event Handling"],
  13: ["Python Fundamentals", "Lists & Dictionaries", "File Handling"],
  14: ["Java OOP Concepts", "Classes & Objects", "Inheritance"],
  15: ["C++ Pointers", "Memory Management", "STL Containers"],
  16: ["Data Structures", "Arrays & Linked Lists", "Stacks & Queues"],
  17: ["Trees & Graphs", "Binary Search Trees", "Graph Traversal"],
  18: ["Sorting Algorithms", "Searching Algorithms", "Time Complexity"],
  19: ["Dynamic Programming", "Recursion", "Backtracking"],
  20: ["Database Concepts", "SQL Queries", "Normalization"],
  21: ["Operating Systems", "Process Management", "Memory Management"],
  22: ["Computer Networks", "TCP/IP", "HTTP/HTTPS"],
  23: ["System Design", "Scalability", "Load Balancing"],
  24: ["Web Development", "React/Angular", "REST APIs"],
  25: ["Final Revision", "Mock Interviews", "Coding Practice"],
}

const categoryColors = {
  "Quantitative Aptitude": "from-blue-400 to-blue-600",
  "Programming Languages": "from-green-400 to-green-600",
  "Data Structures & Algorithms": "from-purple-400 to-purple-600",
  "Computer Science": "from-orange-400 to-orange-600",
  "Final Preparation": "from-red-400 to-red-600",
}

const categoryIcons = {
  "Quantitative Aptitude": Brain,
  "Programming Languages": Code,
  "Data Structures & Algorithms": Trophy,
  "Computer Science": BookOpen,
  "Final Preparation": Star,
}

export default function PlacementPrepTracker() {
  const [day, setDay] = useState(1)
  const [completed, setCompleted] = useState<string[]>([])
  const [completedDays, setCompletedDays] = useState<number[]>([])

  useEffect(() => {
    const savedDay = localStorage.getItem("day")
    const savedCompleted = localStorage.getItem("completed")
    const savedCompletedDays = localStorage.getItem("completedDays")

    if (savedDay) setDay(Number(savedDay))
    if (savedCompleted) setCompleted(JSON.parse(savedCompleted))
    if (savedCompletedDays) setCompletedDays(JSON.parse(savedCompletedDays))
  }, [])

  useEffect(() => {
    localStorage.setItem("day", day.toString())
    localStorage.setItem("completed", JSON.stringify(completed))
    localStorage.setItem("completedDays", JSON.stringify(completedDays))
  }, [day, completed, completedDays])

  const toggleTopic = (topic: string) => {
    const key = `${day}-${topic}`
    const newCompleted = completed.includes(key) ? completed.filter((t) => t !== key) : [...completed, key]

    setCompleted(newCompleted)

    // Check if all topics for current day are completed
    const dayTopics = topics[day as keyof typeof topics] || []
    const dayCompletedCount = dayTopics.filter((t) => newCompleted.includes(`${day}-${t}`)).length

    if (dayCompletedCount === 3 && !completedDays.includes(day)) {
      setCompletedDays([...completedDays, day])
    } else if (dayCompletedCount < 3 && completedDays.includes(day)) {
      setCompletedDays(completedDays.filter((d) => d !== day))
    }
  }

  const getCategory = () => {
    if (day <= 10) return "Quantitative Aptitude"
    if (day <= 15) return "Programming Languages"
    if (day <= 20) return "Data Structures & Algorithms"
    if (day <= 24) return "Computer Science"
    return "Final Preparation"
  }

  const getCategoryColor = () => categoryColors[getCategory() as keyof typeof categoryColors]
  const CategoryIcon = categoryIcons[getCategory() as keyof typeof categoryIcons]

  const progress = (completed.length / 75) * 100
  const dayProgress = (completedDays.length / 25) * 100

  const generateCalendar = () => {
    const days = []
    for (let i = 1; i <= 25; i++) {
      days.push(i)
    }
    return days
  }

  const getDayStatus = (dayNum: number) => {
    if (completedDays.includes(dayNum)) return "completed"
    if (dayNum === day) return "current"
    if (dayNum < day) return "missed"
    return "upcoming"
  }

  const getDayColor = (dayNum: number) => {
    const status = getDayStatus(dayNum)
    switch (status) {
      case "completed":
        return "bg-green-500 text-white"
      case "current":
        return "bg-blue-500 text-white ring-4 ring-blue-200"
      case "missed":
        return "bg-red-200 text-red-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4 shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
                Progress Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {generateCalendar().map((dayNum) => (
                  <button
                    key={dayNum}
                    onClick={() => setDay(dayNum)}
                    className={`
                      w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-110
                      ${getDayColor(dayNum)}
                    `}
                  >
                    {dayNum}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Completed ({completedDays.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span>Current Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 rounded"></div>
                  <span>Missed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <span>Upcoming</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="text-sm font-medium mb-2">Day Completion</div>
                <Progress value={dayProgress} className="h-3" />
                <div className="text-xs text-gray-600 mt-1">{completedDays.length} of 25 days completed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="relative">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
                Placement Prep Tracker
              </h1>
              <div className="absolute -top-2 -right-2">
                <Star className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <p className="text-lg text-gray-600 font-medium">
              Master Your Skills • Ace Your Interviews • Land Your Dream Job
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{Math.round(progress)}%</div>
                <div className="text-blue-100">Overall Progress</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{completed.length}</div>
                <div className="text-green-100">Topics Completed</div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <div className="text-3xl font-bold">{completedDays.length}</div>
                <div className="text-purple-100">Days Completed</div>
              </CardContent>
            </Card>
          </div>

          {/* Current Day Topics */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur">
            <CardHeader className={`bg-gradient-to-r ${getCategoryColor()} text-white rounded-t-lg`}>
              <CardTitle className="flex items-center gap-3 text-xl">
                <CategoryIcon className="h-6 w-6" />
                <div>
                  <div>
                    Day {day} - {getCategory()}
                  </div>
                  <div className="text-sm opacity-90 font-normal">
                    {completedDays.includes(day) ? "✅ Day Completed!" : "Complete all 3 topics to mark day as done"}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {topics[day as keyof typeof topics]?.map((topic, i) => {
                  const isCompleted = completed.includes(`${day}-${topic}`)
                  return (
                    <div
                      key={i}
                      className={`
                        flex items-center space-x-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg
                        ${
                          isCompleted
                            ? "bg-green-50 border-green-200 shadow-md"
                            : "bg-white border-gray-200 hover:border-purple-300"
                        }
                      `}
                    >
                      <Checkbox checked={isCompleted} onCheckedChange={() => toggleTopic(topic)} className="h-5 w-5" />
                      <div className="flex-1">
                        <span
                          className={`
                          text-lg font-medium transition-all duration-200
                          ${isCompleted ? "line-through text-green-600" : "text-gray-800"}
                        `}
                        >
                          {topic}
                        </span>
                      </div>
                      {isCompleted && (
                        <Badge className="bg-green-500 hover:bg-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-between items-center pt-6 mt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setDay(Math.max(1, day - 1))}
                  disabled={day === 1}
                  className="px-6 py-2 hover:bg-purple-50"
                >
                  ← Previous Day
                </Button>

                <div className="text-center">
                  <div className="text-sm text-gray-600">Day Progress</div>
                  <Progress
                    value={
                      ((topics[day as keyof typeof topics]?.filter((t) => completed.includes(`${day}-${t}`)).length ||
                        0) /
                        3) *
                      100
                    }
                    className="w-32 h-2 mt-1"
                  />
                </div>

                <Button
                  onClick={() => setDay(Math.min(25, day + 1))}
                  disabled={day === 25}
                  className={`px-6 py-2 bg-gradient-to-r ${getCategoryColor()} hover:opacity-90`}
                >
                  Next Day →
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Section */}
          {completedDays.length > 0 && (
            <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {completedDays.slice(-10).map((completedDay) => (
                    <Badge key={completedDay} variant="secondary" className="bg-orange-100 text-orange-800 px-3 py-1">
                      Day {completedDay} ✅
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
