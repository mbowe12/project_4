window.addEventListener("load", () => {
  const newAlbumButton = document.getElementById("newAlbumButton");
  const albumNameInput = document.getElementById("albumName");
  const submitterNameInput = document.getElementById("submitterName");
  const albumSubmissionsBody = document.getElementById("albumSubmissionsBody");

  function addAlbumToTable(album) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${album.albumName}</td>
      <td>${album.submitterName}</td>
      <td>${album.dateTime}</td>
    `;
    albumSubmissionsBody.appendChild(newRow);
  }

  function loadAlbums() {
    fetch("/albums")
      .then((response) => response.json())
      .then((albums) => {
        albumSubmissionsBody.innerHTML = "";
        albums.forEach(addAlbumToTable);
      });
  }

  newAlbumButton.addEventListener("click", () => {
    const albumName = albumNameInput.value.trim();
    const submitterName = submitterNameInput.value.trim();

    if (albumName && submitterName) {
      fetch("/newAlbum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ albumName, submitterName }),
      })
        .then((response) => response.json())
        .then((data) => {
          addAlbumToTable(data.album);
          albumNameInput.value = "";
          submitterNameInput.value = "";
        });
    } else {
      alert("Please enter both album name and submitter name.");
    }
  });

  // Add this function to calculate and update the days since last release
  function updateDaysSinceRelease() {
    const lastReleaseDate = new Date("2024-08-09T00:00:00");
    const currentDate = new Date();
    const timeDifference = currentDate - lastReleaseDate;
    const daysSinceRelease = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const daysSinceReleaseElement = document.getElementById("daysSinceRelease");
    daysSinceReleaseElement.textContent = daysSinceRelease;
  }

  // Call the function immediately and then every second
  updateDaysSinceRelease();
  setInterval(updateDaysSinceRelease, 1000);

  loadAlbums();
});
