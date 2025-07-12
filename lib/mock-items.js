// Mock items for browse page
const mockItems = [
  {
    id: "m1",
    title: "Vintage Blue Denim Jacket",
    category: "Jackets",
    condition: "Excellent",
    points: 30,
    images: ["/jacket.jpg"],
    userName: "Utkarsh Singh",
  },
  {
    id: "m2",
    title: "Black Slim Fit Formal Trouser",
    category: "Bottoms",
    condition: "Like New",
    points: 25,
    images: ["/trouser.jpg"],
    userName: "Tarun Singh",
  },
  {
    id: "m3",
    title: "Graphic Oversized T-Shirt",
    category: "Tops",
    condition: "Good",
    points: 30,
    images: ["/tshirt.jpg"],
    userName: "Utkarsh Singh",
  },
  {
    id: "m4",
    title: "Green Cargo Pants",
    category: "Bottoms",
    condition: "Very Good",
    points: 45,
    images: ["/pants.jpg"],
    userName: "Chahat Khandelwal",
  },
]

export function getMockItems() {
  return mockItems
}
