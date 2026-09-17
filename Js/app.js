const API_URL = "https://jsonplaceholder.typicode.com/posts";
const container = document.getElementById("posts-container");

async function fetchPosts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch posts");
    const posts = await response.json();
    const firstEight = posts.slice(0, 8);
    renderPosts(firstEight);
  } catch (error) {
    container.innerHTML = `<p class="error">Error loading posts: ${error.message}</p>`;
  }
}

function renderPosts(posts) {
  container.innerHTML = "";
  posts.forEach((post) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = post.id;

    card.innerHTML = `
      <h2>${escapeHtml(post.title)}</h2>
      <p>${escapeHtml(post.body)}</p>
      <button class="delete-btn" data-id="${post.id}">Delete Post</button>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", handleDelete);
  });
}

async function handleDelete(event) {
  const button = event.currentTarget;
  const postId = button.dataset.id;
  const card = button.closest(".card");

  button.disabled = true;
  button.textContent = "Deleting...";

  try {
    const response = await fetch(`${API_URL}/${postId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      card.remove();
    } else {
      throw new Error("Delete request failed");
    }
  } catch (error) {
    button.disabled = false;
    button.textContent = "Delete Post";
    alert(`Could not delete post ${postId}: ${error.message}`);
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

fetchPosts();