//home page
const images = ["img1.png", "img2.png", "img3.png"]; // Replace with your image paths
    let index = 0;
    const imgElement = document.getElementById("slideshow");

    setInterval(() => {
      index = (index + 1) % images.length;
      imgElement.style.opacity = 0;
      setTimeout(() => {
        imgElement.src = images[index];
        imgElement.style.opacity = 1;
      }, 500);
    }, 3000);

//dashboard
function reportLost() {
    alert("Redirecting to Report Lost Item form...");
    //window.location.href = "report-lost.html";
}

function viewLost() {
    alert("Redirecting to View Lost Items...");
    //window.location.href = "view-lost.html";
}

function reportFound() {
    alert("Redirecting to Report Found Item form...");
}

function viewFound() {
    alert("Redirecting to View Lost Items...");
}


