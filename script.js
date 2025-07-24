// Toggle section dropdown
function toggleSection(header) {
    const section = header.nextElementSibling;
    section.classList.toggle("hidden");
    const arrow = header.querySelector("span");
    arrow.textContent = section.classList.contains("hidden") ? "►" : "▼";
  }
  
  // Filter ECs by tags and search
  const checkboxes = document.querySelectorAll('.checkbox-label input');
  const searchBox = document.getElementById('searchBox');
  const cards = document.querySelectorAll('.ec-card');
  
  function filterECs() {
    const selectedTags = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value.toLowerCase());
    const searchTerm = searchBox.value.toLowerCase();
    cards.forEach(card => {
      const tags = card.getAttribute('data-tags').toLowerCase();
      const content = card.textContent.toLowerCase();
      const matchesSearch = content.includes(searchTerm);
      const matchesTags = selectedTags.every(tag => tags.includes(tag));
      card.style.display = (matchesSearch && matchesTags) ? '' : 'none';
    });
  }
  
  // Hook up filters
  checkboxes.forEach(cb => cb.addEventListener('change', filterECs));
  searchBox.addEventListener('input', filterECs);
