// Section toggle
function toggleSection(header) {
  const section = header.nextElementSibling;
  section.classList.toggle("hidden");
  const arrow = header.querySelector("span");
  arrow.style.transform = section.classList.contains("hidden") ? "rotate(-90deg)" : "rotate(0)";
}

// Elements
const checkboxes = document.querySelectorAll('.checkbox-label input:not([value="January"]):not([value="February"]):not([value="March"]):not([value="April"]):not([value="May"]):not([value="June"]):not([value="July"]):not([value="August"]):not([value="September"]):not([value="October"]):not([value="November"]):not([value="December"])');
const deadlineCheckboxes = document.querySelectorAll('.checkbox-label input[value="January"], .checkbox-label input[value="February"], .checkbox-label input[value="March"], .checkbox-label input[value="April"], .checkbox-label input[value="May"], .checkbox-label input[value="June"], .checkbox-label input[value="July"], .checkbox-label input[value="August"], .checkbox-label input[value="September"], .checkbox-label input[value="October"], .checkbox-label input[value="November"], .checkbox-label input[value="December"]');
const searchBox = document.getElementById('searchBox');
const likedToggle = document.getElementById('likedOnly');
const cards = document.querySelectorAll('.ec-card');

function filterECs() {
  const selectedTags = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.toLowerCase());

  const selectedMonths = Array.from(deadlineCheckboxes)
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
    const matchesMonths = selectedMonths.length === 0 || selectedMonths.some(month => tags.includes(month));

    const shouldDisplay = matchesSearch && matchesTags && matchesMonths && (!likedOnly || isLiked);

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
deadlineCheckboxes.forEach(cb => cb.addEventListener('change', filterECs));
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
