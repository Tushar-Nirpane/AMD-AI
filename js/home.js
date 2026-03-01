// ============================================================
// home.js – Home Page Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    renderHomeCourses();
    renderPaths();
});

// ── Course Cards ──────────────────────────────────────────────
function renderHomeCourses() {
    const grid = document.getElementById('homeCourseGrid');
    if (!grid) return;

    // Show first 8 courses
    const featured = COURSES.slice(0, 8);
    grid.innerHTML = featured.map(renderCourseCard).join('');

    // Animate in
    grid.querySelectorAll('.course-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = '';
        }, i * 60);
    });
}

function renderCourseCard(course) {
    const provider = PROVIDERS[course.provider];
    const stars = '★'.repeat(Math.floor(course.rating)) + (course.rating % 1 >= 0.5 ? '★' : '');
    const priceClass = course.price === 'Free' || course.price === 'Free Audit' ? 'free' : '';
    const tagsHTML = course.tags.slice(0, 3).map((t, i) => `<span class="tag ${course.tagType[i] || ''}">${t}</span>`).join('');

    return `
    <div class="course-card" onclick="window.location.href='catalog.html'">
      <div class="course-card-thumb">
        <div class="course-card-thumb-inner" style="background:${course.bg}">
          <span>${course.emoji}</span>
        </div>
      </div>
      <div class="course-card-body">
        <div class="course-card-provider">
          <span>${provider.emoji}</span>
          <span>${provider.name}</span>
        </div>
        <div class="course-card-title">${course.title}</div>
        <div class="course-card-tags">${tagsHTML}</div>
        <div class="course-card-rating">
          <span class="stars">${stars}</span>
          <span class="rating-num">${course.rating}</span>
          <span class="rating-count">(${course.ratingCount})</span>
        </div>
      </div>
      <div class="course-card-footer">
        <span class="price-tag ${priceClass}">${course.price}</span>
        <span class="duration-tag">⏱ ${course.duration}</span>
      </div>
    </div>
  `;
}

// ── Community Paths ───────────────────────────────────────────
function renderPaths() {
    const grid = document.getElementById('pathsGrid');
    if (!grid) return;

    grid.innerHTML = COMMUNITY_PATHS.map(renderPathCard).join('');
}

function renderPathCard(path) {
    const coursesHTML = path.courses.map(c => `<div class="path-course-item">${c}</div>`).join('');
    return `
    <div class="path-card" onclick="window.location.href='catalog.html'">
      <div class="path-header">
        <span class="path-emoji">${path.emoji}</span>
        <div>
          <div class="path-title">${path.title}</div>
          <div class="path-author">by ${path.author}</div>
        </div>
      </div>
      <div class="path-courses">${coursesHTML}</div>
      <div class="path-meta">
        <span>📚 ${path.courseCount} courses</span>
        <span>⏱ ${path.duration}</span>
        <span>👥 ${path.followers}</span>
      </div>
    </div>
  `;
}

// ── Solver Example Chip ───────────────────────────────────────
function setSolverExample(btn) {
    const input = document.getElementById('solverInput');
    if (input) {
        input.value = btn.textContent;
        input.focus();
    }
}
