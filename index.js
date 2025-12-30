const axios = require("axios");
const BASE_URL = "http://localhost:5000";

// ---------------------
// Tasks 1–5: Books
// ---------------------
async function getAllBooks() {
  try {
    const res = await axios.get(`${BASE_URL}/books`);
    console.log("All Books:", res.data);
  } catch (err) {
    console.error("Error getAllBooks:", err.message);
  }
}

async function getBookByISBN(isbn) {
  try {
    const res = await axios.get(`${BASE_URL}/books/isbn/${isbn}`);
    console.log(`Book with ISBN ${isbn}:`, res.data);
  } catch (err) {
    console.error("Error getBookByISBN:", err.message);
  }
}

async function getBooksByAuthor(author) {
  try {
    const res = await axios.get(`${BASE_URL}/books/author/${encodeURIComponent(author)}`);
    console.log(`Books by ${author}:`, res.data);
  } catch (err) {
    console.error("Error getBooksByAuthor:", err.message);
  }
}

async function getBooksByTitle(title) {
  try {
    const res = await axios.get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`);
    console.log(`Books with title containing '${title}':`, res.data);
  } catch (err) {
    console.error("Error getBooksByTitle:", err.message);
  }
}

async function getBookReviews(isbn) {
  try {
    const res = await axios.get(`${BASE_URL}/books/review/${isbn}`);
    console.log(`Reviews for ISBN ${isbn}:`, res.data);
  } catch (err) {
    console.error("Error getBookReviews:", err.message);
  }
}

// ---------------------
// Tasks 6–7: Users
// ---------------------
async function registerUser(username, password) {
  try {
    const res = await axios.post(`${BASE_URL}/register`, { username, password });
    console.log(res.data.message);
  } catch (err) {
    console.error("Error registerUser:", err.response?.data?.message || err.message);
  }
}

async function loginUser(username, password) {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { username, password });
    console.log(res.data.message);
  } catch (err) {
    console.error("Error loginUser:", err.response?.data?.message || err.message);
  }
}

// ---------------------
// Tasks 8–9: Reviews
// ---------------------
async function addOrModifyReview(isbn, username, review) {
  try {
    const res = await axios.post(`${BASE_URL}/books/review/${isbn}`, { username, review });
    console.log(res.data.message);
  } catch (err) {
    console.error("Error addOrModifyReview:", err.response?.data?.message || err.message);
  }
}

async function deleteReview(isbn, username) {
  try {
    const res = await axios.delete(`${BASE_URL}/books/review/${isbn}`, { data: { username } });
    console.log(res.data.message);
  } catch (err) {
    console.error("Error deleteReview:", err.response?.data?.message || err.message);
  }
}

// ---------------------
// Task 14: GitHub submission
// ---------------------
function submitGitHubLink(link) {
  console.log("Submit this GitHub link:", link || "https://github.com/<your-username>/bookshop-api");
}

// ---------------------
// CLI Parsing
// ---------------------
const args = process.argv.slice(2);

function getArg(flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) return args[index + 1];
  return null;
}

// Task 1–5
if (args.includes("--task=getAllBooks")) getAllBooks();
if (args.includes("--task=getBookByISBN")) getBookByISBN(getArg("--isbn"));
if (args.includes("--task=getBooksByAuthor")) getBooksByAuthor(getArg("--author"));
if (args.includes("--task=getBooksByTitle")) getBooksByTitle(getArg("--title"));
if (args.includes("--task=getBookReviews")) getBookReviews(getArg("--isbn"));

// Task 6–7
if (args.includes("--task=registerUser")) registerUser(getArg("--username"), getArg("--password"));
if (args.includes("--task=loginUser")) loginUser(getArg("--username"), getArg("--password"));

// Task 8–9
if (args.includes("--task=addOrModifyReview")) addOrModifyReview(getArg("--isbn"), getArg("--username"), getArg("--review"));
if (args.includes("--task=deleteReview")) deleteReview(getArg("--isbn"), getArg("--username"));

// Task 10–13
if (args.includes("--task=task10AsyncAllBooks")) getAllBooks();
if (args.includes("--task=task11PromiseISBN")) {
  const isbn = getArg("--isbn");
  axios.get(`${BASE_URL}/books/isbn/${isbn}`)
    .then(res => console.log("Promise - Book by ISBN:", res.data))
    .catch(err => console.error("Error:", err.message));
}

// Task 14
if (args.includes("--task=submitGitHub")) submitGitHubLink(getArg("--link"));
