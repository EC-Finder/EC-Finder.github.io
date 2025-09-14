// ===============================
//    EC FINDER - MAIN SCRIPT
// ===============================

// Section toggle functionality for sidebar
function toggleSection(header) {
  const section = header.nextElementSibling
  const isCollapsed = section.classList.contains("collapsed")

  // Toggle collapsed state
  section.classList.toggle("collapsed")
  header.parentElement.classList.toggle("collapsed")

  // Rotate arrow
  const arrow = header.querySelector("span")
  if (arrow) {
    arrow.style.transform = section.classList.contains("collapsed") ? "rotate(-90deg)" : "rotate(0deg)"
  }
}

// Get DOM elements
const checkboxes = document.querySelectorAll(
  '.checkbox-label input:not([value="January"]):not([value="February"]):not([value="March"]):not([value="April"]):not([value="May"]):not([value="June"]):not([value="July"]):not([value="August"]):not([value="September"]):not([value="October"]):not([value="November"]):not([value="December"])',
)
const deadlineCheckboxes = document.querySelectorAll(
  '.checkbox-label input[value="January"], .checkbox-label input[value="February"], .checkbox-label input[value="March"], .checkbox-label input[value="April"], .checkbox-label input[value="May"], .checkbox-label input[value="June"], .checkbox-label input[value="July"], .checkbox-label input[value="August"], .checkbox-label input[value="September"], .checkbox-label input[value="October"], .checkbox-label input[value="November"], .checkbox-label input[value="December"]',
)
const searchBox = document.getElementById("searchBox")
const likedToggle = document.getElementById("likedOnly")
const cards = document.querySelectorAll(".ec-card")

// Main filtering function
function filterECs() {
  // Get selected filters
  const selectedTags = Array.from(checkboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value.toLowerCase())

  const selectedMonths = Array.from(deadlineCheckboxes)
    .filter((cb) => cb.checked)
    .map((cb) => cb.value.toLowerCase())

  const searchTerm = searchBox.value.toLowerCase()
  const likedOnly = likedToggle.checked

  let visibleCount = 0

  // Filter each card
  cards.forEach((card) => {
    const tags = card.getAttribute("data-tags").toLowerCase()
    const content = card.textContent.toLowerCase()
    const isLiked = card.classList.contains("liked")

    // Check all filter conditions
    const matchesSearch = !searchTerm || content.includes(searchTerm)
    const matchesTags = selectedTags.length === 0 || selectedTags.every((tag) => tags.includes(tag))
    const matchesMonths =
      selectedMonths.length === 0 || tags.includes("year-round") || selectedMonths.some((month) => tags.includes(month))
    const matchesLiked = !likedOnly || isLiked

    const shouldDisplay = matchesSearch && matchesTags && matchesMonths && matchesLiked

    // Show/hide card
    card.style.display = shouldDisplay ? "block" : "none"
    if (shouldDisplay) visibleCount++
  })

  // Update results count (if you want to add this feature)
  updateResultsCount(visibleCount)
}

// Update results count display
function updateResultsCount(count) {
  // You could add a results counter element to show how many activities match
  const existingCounter = document.getElementById("results-counter")
  if (existingCounter) {
    existingCounter.textContent = `${count} activities found`
  }
}

// Initialize like button functionality
function initializeLikeButtons() {
  document.querySelectorAll(".like-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation() // Prevent card click when clicking heart

      const card = button.closest(".ec-card")
      const isLiked = card.classList.contains("liked")

      // Toggle like state
      card.classList.toggle("liked")
      button.classList.toggle("liked")
      button.textContent = isLiked ? "♡" : "♥"

      // Save to local storage (optional enhancement)
      saveLikedState(card)

      // Re-apply filters if "Show Liked" is on
      filterECs()
    })
  })
}

// Save liked state to localStorage (enhancement)
function saveLikedState(card) {
  const cardTitle = card.querySelector("h3").textContent
  const likedCards = JSON.parse(localStorage.getItem("likedECs") || "[]")

  if (card.classList.contains("liked")) {
    if (!likedCards.includes(cardTitle)) {
      likedCards.push(cardTitle)
    }
  } else {
    const index = likedCards.indexOf(cardTitle)
    if (index > -1) {
      likedCards.splice(index, 1)
    }
  }

  localStorage.setItem("likedECs", JSON.stringify(likedCards))
}

// Load liked state from localStorage (enhancement)
function loadLikedState() {
  const likedCards = JSON.parse(localStorage.getItem("likedECs") || "[]")

  cards.forEach((card) => {
    const cardTitle = card.querySelector("h3").textContent
    const likeBtn = card.querySelector(".like-btn")

    if (likedCards.includes(cardTitle)) {
      card.classList.add("liked")
      likeBtn.classList.add("liked")
      likeBtn.textContent = "♥"
    }
  })
}

// Make cards clickable (except when clicking like button)
function initializeCardClicks() {
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't open link if clicking the like button
      if (e.target.classList.contains("like-btn")) return

      const url = card.getAttribute("data-url")
      if (url) {
        window.open(url, "_blank")
      }
    })
  })
}

// Add event listeners for filtering
function initializeEventListeners() {
  // Filter event listeners
  checkboxes.forEach((cb) => cb.addEventListener("change", filterECs))
  deadlineCheckboxes.forEach((cb) => cb.addEventListener("change", filterECs))
  searchBox?.addEventListener("input", filterECs)
  likedToggle?.addEventListener("change", filterECs)
}

// Clear all filters function (enhancement)
function clearAllFilters() {
  // Uncheck all checkboxes
  ;[...checkboxes, ...deadlineCheckboxes].forEach((cb) => (cb.checked = false))

  // Clear search box
  if (searchBox) searchBox.value = ""

  // Uncheck liked only toggle
  if (likedToggle) likedToggle.checked = false

  // Re-run filter to show all cards
  filterECs()
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load saved liked states
  loadLikedState()

  // Initialize all functionality
  initializeLikeButtons()
  initializeCardClicks()
  initializeEventListeners()

  // Run initial filter to set up display
  filterECs()

  // Add clear filters button functionality if it exists
  const clearBtn = document.getElementById("clearFilters")
  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllFilters)
  }
})

// Export functions for potential use in other files
window.ECFinder = {
  filterECs,
  clearAllFilters,
  toggleSection,
}
