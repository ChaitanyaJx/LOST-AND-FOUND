import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface FoundItem {
  id: string;
  description: string;
  category: string;
  location: string;
  dateFound: string;
  imageUrl: string | null;
  finderName: string;
  finderRollNo: string;
  finderEmail: string;
  status: "unclaimed" | "claimed";
}

const FOUNDITEMSPAGE = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  const navigate = useNavigate();

  const handleNavigation = (path: any) => {
    navigate(path);
  };

  const foundItems: FoundItem[] = [
    {
      id: "1",
      description: "Blue Nike Water Bottle",
      category: "Personal Items",
      location: "Science Building, Room 302",
      dateFound: "2025-04-21",
      imageUrl: "/api/placeholder/200/200",
      finderName: "Alicia Johnson",
      finderRollNo: "CS2023045",
      finderEmail: "alicia.j@university.edu",
      status: "unclaimed",
    },
    {
      id: "2",
      description: "MacBook Pro Charger",
      category: "Electronics",
      location: "Library, Study Room B",
      dateFound: "2025-04-22",
      imageUrl: "/api/placeholder/200/200",
      finderName: "Marcus Lee",
      finderRollNo: "EN2023112",
      finderEmail: "marcus.l@university.edu",
      status: "unclaimed",
    },
    {
      id: "3",
      description: "Student ID Card",
      category: "Documents",
      location: "Cafeteria",
      dateFound: "2025-04-20",
      imageUrl: null,
      finderName: "Sophia Williams",
      finderRollNo: "ME2022078",
      finderEmail: "sophia.w@university.edu",
      status: "unclaimed",
    },
    {
      id: "4",
      description: "Black Wireless Earbuds",
      category: "Electronics",
      location: "Gym",
      dateFound: "2025-04-18",
      imageUrl: "/api/placeholder/200/200",
      finderName: "Ryan Chen",
      finderRollNo: "BT2024033",
      finderEmail: "ryan.c@university.edu",
      status: "claimed",
    },
  ];

  const categories = [
    "all",
    "Electronics",
    "Documents",
    "Personal Items",
    "Clothing",
    "Other",
  ];

  // Filter and sort items
  const filteredAndSortedItems = foundItems
    .filter((item) => {
      const matchesSearch =
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateFound).getTime();
      const dateB = new Date(b.dateFound).getTime();

      return sortOption === "newest" ? dateB - dateA : dateA - dateB;
    });

  const filteredItems = filteredAndSortedItems;

  return (
    <div className="m-0 p-0 bg-black">
      <header className="py-10 px-8 bg-[#CF0F47] text-white">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={`text-5xl text-center font-bold`}>FOUND ITEMS</h1>
        </motion.div>
      </header>

      <div className="container mx-auto text-white min-h-screen">
        {/* Search and Filter Section */}
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
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="mb-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="text-[#CF0F47] hover:text-[#FF0B55] transition-colors flex items-center"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Home
                </Link>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="flex justify-between overflow-hidden bg-gray-800 text-white"
            >
              <CardHeader className="pb-2">
                {/* <div className="flex justify-between items-start"> */}
                <CardTitle className="text-lg">{item.description}</CardTitle>
                <Badge
                  variant={
                    item.status === "unclaimed" ? "default" : "secondary"
                  }
                >
                  {item.status === "unclaimed" ? "Unclaimed" : "Claimed"}
                </Badge>
                {/* </div> */}
                <p className="text-sm text-gray-500">
                  Found on {new Date(item.dateFound).toLocaleDateString()}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {item.imageUrl && (
                  // <div className="flex justify-center">
                  <img
                    src={item.imageUrl}
                    alt={item.description}
                    className="rounded-md object-cover h-48 w-full"
                  />
                  // </div>
                )}

                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-xs font-medium text-gray-500">
                      Category:
                    </span>
                    <span className="text-xs col-span-2">{item.category}</span>

                    <span className="text-xs font-medium text-gray-500">
                      Location:
                    </span>
                    <span className="text-xs col-span-2">{item.location}</span>

                    <span className="text-xs font-medium text-gray-500">
                      Finder:
                    </span>
                    <span className="text-xs col-span-2">
                      {item.finderName} ({item.finderRollNo})
                    </span>
                  </div>
                </div>

                <Button variant="default" className="w-full">
                  {item.status === "unclaimed"
                    ? "Claim This Item"
                    : "View Details"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-gray-500 mb-4">
              No items found matching your search
            </p>
            <Button
              variant="outline"
              className="text-black"
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
      <footer
        className={`py-4 px-8 bg-[#CF0F47] border-t border-[#CF0F47] mt-10`}
      >
        <div className="text-center">
          <p className={`text-white text-sm`}>
            Didnt found your lost Item? Make a request
            <button onClick={() => handleNavigation("/lostitem")}>
              {" "}
              here{" "}
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FOUNDITEMSPAGE;
