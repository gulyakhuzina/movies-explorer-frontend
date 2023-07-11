export function handleIsSaved (movie) {
  const likedMovies = JSON.parse(localStorage.getItem('likedMovies'));
  return movie.like = likedMovies.some(card => movie.id === card.movieId);
}