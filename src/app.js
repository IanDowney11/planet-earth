if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}

// Select DOM elements
const loginBtn = document.getElementById("login-btn");
const passwordInput = document.getElementById("admin-password");
const uploadInput = document.getElementById("upload-btn");
const gallery = document.getElementById("gallery");
const customUploadBtn = document.getElementById("customUploadBtn");
const adminLogin = document.getElementById("admin-login");

// Initially hide upload button
uploadInput.style.display = "none";

// Handle login
loginBtn.addEventListener("click", () => {
  const enteredPassword = passwordInput.value.trim();
  if (enteredPassword === "abc") {
    // Show upload button
    //uploadInput.style.display = "block";
    customUploadBtn.style.display = "inline";
    passwordInput.value = "";

    //hide the login box
    adminLogin.style.display = "none";

    //alert("Access granted! You can now upload or take a picture.");
  } else {
    passwordInput.value = "";
    alert("Incorrect password! You Fool!");
  }
});

customUploadBtn.addEventListener("click", () => {
  uploadInput.click();
});

// Handle the image after selection
uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      addImageToGallery(reader.result);
    };
    reader.readAsDataURL(file);
  }
});

// // Handle image upload or capture
// uploadInput.addEventListener("change", () => {
//   const file = uploadInput.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = function () {
//       addImageToGallery(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }
// });

function addImageToGallery(imgSrc) {
  const col = document.createElement("div");
  col.className = "col-md-8 mb-4";

  const card = document.createElement("div");
  card.className = "card p-2";

  const imgContainer = document.createElement("div");
  imgContainer.className = "position-relative";

  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "img-fluid"; // Bootstrap responsive class
  // Responsive and nice size control
  img.style.maxWidth = "95%";
  img.style.margin = "10px auto"; // Top/Bottom margin + center horizontally
  img.style.display = "block";
  img.style.borderRadius = "8px";

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "&times;";
  delBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-2";
  delBtn.onclick = () => {
    col.remove();
  };

  imgContainer.appendChild(img);
  imgContainer.appendChild(delBtn);

  // Optional: Add a textarea below the image
  const textArea = document.createElement("textarea");
  textArea.className = "form-control mt-2"; // margin top for spacing
  textArea.placeholder = "Add info about this photo";

  // Assemble
  card.appendChild(imgContainer);
  card.appendChild(textArea);
  col.appendChild(card);
  document.getElementById("gallery").appendChild(col);
}

const installBtn = document.getElementById("installBtn");

function showInstallButton() {
  installBtn.style.display = "block";
}

installBtn.addEventListener("click", () => {
  installBtn.style.display = "none";
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      console.log(`User response: ${choiceResult.outcome}`);
      deferredPrompt = null;
    });
  }
});

window.addEventListener("appinstalled", () => {
  console.log("App installed");
});
