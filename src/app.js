// Select DOM elements
const loginBtn = document.getElementById("login-btn");
const passwordInput = document.getElementById("admin-password");
const uploadInput = document.getElementById("upload-btn");
const gallery = document.getElementById("gallery");

// Initially hide upload button
uploadInput.style.display = "none";

// Handle login
loginBtn.addEventListener("click", () => {
  const enteredPassword = passwordInput.value.trim();
  if (enteredPassword === "ILoveRufusRoofRoofRoof") {
    // Show upload button
    uploadInput.style.display = "block";
    passwordInput.value = "";
    alert("Access granted! You can now upload or take a picture.");
  } else {
    alert("Incorrect password!");
  }
});

// Handle image upload or capture
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

// Function to add image with delete button to gallery
function addImageToGallery(imgSrc) {
  // Create container div (Bootstrap col for grid)
  const col = document.createElement("div");
  col.className = "col-md-3 position-relative";

  // Create image element
  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "img-thumbnail";

  // Create delete button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "&times;";
  delBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-1";

  // Delete handler
  delBtn.onclick = () => {
    col.remove();
  };

  // Append image and delete button to container
  col.appendChild(img);
  col.appendChild(delBtn);

  // Append container to gallery row
  gallery.appendChild(col);
}
