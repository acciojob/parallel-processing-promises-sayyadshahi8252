// your JS code here
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

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
  output.innerHTML = "";
  errorDiv.innerHTML = "";
  loading.style.display = "block"; // show loading

  Promise.all(images.map(imgObj => downloadImage(imgObj.url)))
    .then(downloadedImages => {
      loading.style.display = "none"; // hide loading
      downloadedImages.forEach(img => {
        output.innerHTML += `<img src="${img.src}" width="200" height="200" style="margin:5px;" />`;
      });
    })
    .catch(error => {
      loading.style.display = "none";
      errorDiv.innerHTML = `Error: ${error}`;
    });
}

// ✅ Attach event listener instead of auto-calling
btn.addEventListener("click", downloadImages);
