// Section toggle
function toggleSection(header) {
  const section = header.nextElementSibling;
  section.classList.toggle("hidden");
  const arrow = header.querySelector("span");
  arrow.style.transform = section.classList.contains("hidden") ? "rotate(-90deg)" : "rotate(0)";
}

// Elements
const checkboxes = document.querySelectorAll('.checkbox-label input');
const searchBox = document.getElementById('searchBox');
const likedToggle = document.getElementById('likedOnly');
const cards = document.querySelectorAll('.ec-card');

// Filter logic
function filterECs() {
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());
  const searchTerm = searchBox.value.toLowerCase();
  const likedOnly = likedToggle.checked;

  cards.forEach(card => {
    const tags = card.getAttribute('data-tags').toLowerCase();
    const content = card.textContent.toLowerCase();
    const isLiked = card.classList.contains('liked');
    const matchesSearch = content.includes(searchTerm);
    const matchesTags = selectedTags.every(tag => tags.includes(tag));
    const shouldDisplay = matchesSearch && matchesTags && (!likedOnly || isLiked);

    card.style.display = shouldDisplay ? '' : 'none';
  });
}

// Like button handler
document.querySelectorAll('.like-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.ec-card');
    card.classList.toggle('liked');
    button.classList.toggle('liked');
    button.textContent = card.classList.contains('liked') ? '♥' : '♡';
    filterECs(); // Re-apply filters if "Show Liked" is on
  });
});

// Event listeners
checkboxes.forEach(cb => cb.addEventListener('change', filterECs));
searchBox.addEventListener('input', filterECs);
likedToggle.addEventListener('change', filterECs);
// Make cards clickable unless clicking the like button
document.querySelectorAll('.ec-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) return; // skip if clicking heart
    const url = card.getAttribute('data-url');
    if (url) window.open(url, '_blank');
  });
});
