document.addEventListener("DOMContentLoaded", () => {
  // Handle random album button
  const randomAlbumBtn = document.getElementById("randomAlbumBtn");
  if (randomAlbumBtn) {
    randomAlbumBtn.addEventListener("click", async () => {
      try {
        const response = await fetch("/albums.json");
        if (!response.ok) throw new Error("Failed to fetch albums");
        const albums = await response.json();
        const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
        window.location.href = `/album.html?id=${albums.indexOf(randomAlbum)}`;
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to get a random album. Please try again.");
      }
    });
  }

  // Load album details
  const albumTitle = document.getElementById("albumTitle");
  if (albumTitle) {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get("id");
    fetch("/albums.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch albums");
        return response.json();
      })
      .then((albums) => {
        const album = albums[albumId];
        if (!album) throw new Error("Album not found");
        document.title = album.title;
        albumTitle.textContent = album.title;
        document.getElementById("albumCover").src = album.album_cover;
        document.getElementById("albumCover").alt = `${album.title} cover`;
        document.getElementById(
          "releaseDate"
        ).textContent = `Release Date: ${album.release_date}`;
        document.getElementById(
          "albumLength"
        ).textContent = `Length: ${album.length_minutes} minutes`;
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to load album details. Please try again.");
      });
  }
});
