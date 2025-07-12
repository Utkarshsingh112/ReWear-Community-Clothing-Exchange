// Items storage utilities
export const ITEMS_KEY = "rewear_items"

export function getItems() {
  if (typeof window === "undefined") return []

  const items = localStorage.getItem(ITEMS_KEY)
  if (!items) return []

  try {
    return JSON.parse(items)
  } catch {
    return []
  }
}

export function saveItem(item) {
  if (typeof window === "undefined") return

  const items = getItems()
  const newItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active",
    views: 0,
    likes: 0,
  }

  items.push(newItem)
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
  return newItem
}

export function getUserItems(userId) {
  const items = getItems()
  return items.filter((item) => item.userId === userId)
}

export function updateItem(itemId, updates) {
  if (typeof window === "undefined") return

  const items = getItems()
  const itemIndex = items.findIndex((item) => item.id === itemId)

  if (itemIndex >= 0) {
    items[itemIndex] = {
      ...items[itemIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
    return items[itemIndex]
  }

  return null
}

export function deleteItem(itemId) {
  if (typeof window === "undefined") return

  const items = getItems()
  const filteredItems = items.filter((item) => item.id !== itemId)
  localStorage.setItem(ITEMS_KEY, JSON.stringify(filteredItems))
}

export function getItemById(itemId) {
  const items = getItems()
  return items.find((item) => item.id === itemId)
}

export function incrementItemViews(itemId) {
  if (typeof window === "undefined") return

  const items = getItems()
  const itemIndex = items.findIndex((item) => item.id === itemId)

  if (itemIndex >= 0) {
    items[itemIndex].views = (items[itemIndex].views || 0) + 1
    localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
    return items[itemIndex]
  }

  return null
}

export function toggleItemLike(itemId, userId) {
  if (typeof window === "undefined") return

  const items = getItems()
  const itemIndex = items.findIndex((item) => item.id === itemId)

  if (itemIndex >= 0) {
    const item = items[itemIndex]
    if (!item.likedBy) item.likedBy = []

    const userLikedIndex = item.likedBy.indexOf(userId)
    if (userLikedIndex >= 0) {
      // Remove like
      item.likedBy.splice(userLikedIndex, 1)
      item.likes = Math.max(0, (item.likes || 0) - 1)
    } else {
      // Add like
      item.likedBy.push(userId)
      item.likes = (item.likes || 0) + 1
    }

    localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
    return items[itemIndex]
  }

  return null
}

// Convert file to base64
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

// Process multiple files to base64
export async function processImages(files) {
  const promises = Array.from(files).map((file) => fileToBase64(file))
  return Promise.all(promises)
}
