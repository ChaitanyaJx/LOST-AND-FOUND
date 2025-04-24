import React, { useState } from "react";
import { Search, Calendar, MapPin, Tag, User, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface LostItem {
  id: string;
  description: string;
  category: string;
  possibleLocation: string;
  dateLost: string;
  imageUrl: string | null;
  status: "searching" | "found";
}

const LOSTITEMS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");

  // Mock data for lost items
  const lostItems: LostItem[] = [
    {
      id: "1",
      description: "Black Leather Wallet with ID Cards",
      category: "Personal Items",
      possibleLocation: "Engineering Building or Cafeteria",
      dateLost: "2025-04-21",
      imageUrl: "/api/placeholder/100/100",
      status: "searching",
    },
    {
      id: "2",
      description: "iPhone 15 Pro with Green Case",
      category: "Electronics",
      possibleLocation: "Library 2nd Floor",
      dateLost: "2025-04-22",
      imageUrl: "/api/placeholder/100/100",
      status: "searching",
    },
    {
      id: "3",
      description: "Physics Textbook with Notes",
      category: "Books",
      possibleLocation: "Physics Lab or Study Hall",
      dateLost: "2025-04-19",
      imageUrl: null,
      status: "searching",
    },
    {
      id: "4",
      description: "Blue Hydro Flask Water Bottle",
      category: "Personal Items",
      possibleLocation: "Gym or Basketball Court",
      dateLost: "2025-04-20",
      imageUrl: "/api/placeholder/100/100",
      status: "found",
    },
    {
      id: "5",
      description: "Calculator TI-84 Plus",
      category: "Electronics",
      possibleLocation: "Math Building, Room 204",
      dateLost: "2025-04-18",
      imageUrl: "/api/placeholder/100/100",
      status: "searching",
    },
    {
      id: "6",
      description: "USB Drive with Important Files",
      category: "Electronics",
      possibleLocation: "Computer Lab",
      dateLost: "2025-04-17",
      imageUrl: null,
      status: "found",
    },
  ];

  const categories = [
    "all",
    "Electronics",
    "Documents",
    "Personal Items",
    "Books",
    "Clothing",
    "Other",
  ];
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  // Filter and sort items
  const filteredAndSortedItems = lostItems
    .filter((item) => {
      const matchesSearch =
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.possibleLocation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateLost).getTime();
      const dateB = new Date(b.dateLost).getTime();

      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="p-0 m-o min-h-screen bg-black">
      <header className="py-10 px-8 bg-[#CF0F47] text-white">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-5xl text-center font-bold`}>LOST ITEMS</h1>
        </motion.div>
      </header>

      <div className="container mx-auto text-white pb-4">
        {/* Search, Filter, and Sort Section */}
        <div className="flex flex-col md:flex-row gap-4 my-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-700" />
            <Input
              placeholder="Search by description or location"
              className="pl-10 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Items Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredAndSortedItems.length}{" "}
            {filteredAndSortedItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Items List - Compact Cards */}
        <div className="space-y-4">
          {filteredAndSortedItems.map((item) => (
            <Card
              key={item.id}
              className={`overflow-hidden border-l-4 ${
                item.status === "found"
                  ? "border-l-green-500"
                  : "border-l-blue-500"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Item Image (if available) */}
                  {item.imageUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.description}
                        className="rounded-md object-cover h-16 w-16"
                      />
                    </div>
                  )}

                  {/* Item Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-base">
                          {item.description}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" /> Lost on{" "}
                          {new Date(item.dateLost).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <p className="flex items-center gap-1">
                        <Tag className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Category:</span>{" "}
                        {item.category}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-gray-500">Location:</span>{" "}
                        {item.possibleLocation}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="grid grid-cols-1 gap-1">
                    <Button variant="secondary" size="sm">
                      {item.status === "searching" ? "Searching" : "Found"}
                    </Button>
                    <Button variant="outline" size="lg">
                      {item.status === "searching" ? "Found This" : "Details"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-gray-500 mb-4">
              No items found matching your search
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setSortOption("newest");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}

        {/* Add New Lost Item Button */}
        <div className="fixed bottom-8 right-8">
          <Button size="lg" className="rounded-full shadow-lg">
            Report Lost Item
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LOSTITEMS;
