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
  if (enteredPassword === "abc") {
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

function addImageToGallery(imgSrc) {
  // Container div for image, delete button, and textarea
  const col = document.createElement("div");
  col.className = "col-md-8 mb-4";

  const card = document.createElement("div");
  card.className = "card";

  // Image element
  const img = document.createElement("img");
  img.src = imgSrc;
  img.className = "card-img-top";

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "&times;";
  delBtn.className = "btn btn-danger btn-sm position-absolute top-0 end-0 m-2";
  delBtn.onclick = () => {
    col.remove();
  };

  // Wrap image in a position-relative div (or use position-relative to position delete button)
  const imgContainer = document.createElement("div");
  imgContainer.className = "position-relative";

  imgContainer.appendChild(img);
  imgContainer.appendChild(delBtn);

  // Textarea for info
  const textArea = document.createElement("textarea");
  textArea.className = "form-control m-2";
  textArea.placeholder = "Add info about this photo";
  textArea.rows = 10;

  // Append all to card
  card.appendChild(imgContainer);
  card.appendChild(textArea);
  col.appendChild(card);

  // Append to gallery
  document.getElementById("gallery").appendChild(col);
}
