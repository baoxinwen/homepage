(function initializeTheme() {
  var savedTheme = null;
  try {
    var value = window.localStorage.getItem('theme');
    if (value === 'light' || value === 'dark') savedTheme = value;
  } catch {
    savedTheme = null;
  }

  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = (savedTheme || (prefersDark ? 'dark' : 'light')) === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? '#171611' : '#F3F0E8');
}());
