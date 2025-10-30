// your JS code here
const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
  });
}

function downloadImages() {
  output.innerHTML = `<p>Loading...</p>`; // loading spinner text (you can replace with spinner icon)

  Promise.all(images.map(imgObj => downloadImage(imgObj.url)))
    .then(downloadedImages => {
      output.innerHTML = ""; // clear loading

      downloadedImages.forEach(img => {
        output.innerHTML += `<img src="${img.src}" width="200" height="200" style="margin:5px;" />`;
      });
    })
    .catch(error => {
      output.innerHTML = `<p style="color:red;">Error: ${error}</p>`;
    });
}

// Call function (or use button if you want)
downloadImages();
