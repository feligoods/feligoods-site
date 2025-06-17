// Update text next to sliders
document.querySelectorAll('.control input').forEach(input => {
  input.addEventListener('input', () => {
    input.parentElement.querySelector('span').textContent = input.value;
  });
});
