// 1️⃣ Import required modules
const express = require("express");
const bodyParser = require("body-parser");

// 2️⃣ Create express app
const app = express();
const PORT = 5000;

// 3️⃣ Middleware
app.use(bodyParser.json());

// 4️⃣ Add root route here (AFTER app is defined ✅)
app.get("/", (req, res) => {
  res.send("<h1>📚 Bookshop API is running!</h1><p>Try /books to see data.</p>");
});

// 5️⃣ Sample data
let books = [
  {
    isbn: "123456",
    title: "Node.js Basics",
    author: "John Doe",
    reviews: [],
  },
  {
    isbn: "789101",
    title: "Learning Express",
    author: "Jane Smith",
    reviews: [],
  },
];

// 6️⃣ Routes for API
app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/isbn/:isbn", (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

app.get("/books/author/:author", (req, res) => {
  const result = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  result.length ? res.json(result) : res.status(404).json({ message: "No books found" });
});

app.get("/books/title/:title", (req, res) => {
  const result = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
  result.length ? res.json(result) : res.status(404).json({ message: "No books found" });
});

// Task 5: Get book reviews
app.get("/books/review/:isbn", (req, res) => {
  const book = books.find(b => String(b.isbn) === String(req.params.isbn));
  if (book) res.json(book.reviews);
  else res.status(404).json({ message: "Book not found" });
});

// -------------------
// 🧍 User Registration & Login (Task 6 & 7)
// -------------------

let users = []; // In-memory user store

// Task 6: Register New User
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ username, password });
  res.json({ message: "User registered successfully" });
});

// Task 7: Login as Registered User
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user: { username } });
});

// -------------------
// 📝 Book Reviews (Task 8 & 9)
// -------------------

// Task 8: Add or Modify a Review
app.post("/books/review/:isbn", (req, res) => {
  const { username, review } = req.body;
  const book = books.find(b => String(b.isbn) === String(req.params.isbn));
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (!username || !review) {
    return res.status(400).json({ message: "Username and review required" });
  }

  const existingReview = book.reviews.find(r => r.username === username);

  if (existingReview) {
    existingReview.text = review;
    return res.json({ message: "Review updated successfully", book });
  } else {
    book.reviews.push({ username, text: review });
    return res.json({ message: "Review added successfully", book });
  }
});


// Task 9: Delete Review
app.delete("/books/review/:isbn", (req, res) => {
  const { username } = req.body;
  const book = books.find(b => String(b.isbn) === String(req.params.isbn));

  if (!book) return res.status(404).json({ message: "Book not found" });

  const reviewIndex = book.reviews.findIndex(r => r.username === username);

  if (reviewIndex === -1) {
    return res.status(404).json({ message: "Review not found for this user" });
  }

  book.reviews.splice(reviewIndex, 1);
  res.json({ message: "Review deleted successfully", book });
});

// 7️⃣ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
