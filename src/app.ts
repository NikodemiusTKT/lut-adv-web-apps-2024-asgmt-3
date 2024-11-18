import express, { Request, Response } from "express";

import exp from "constants";
import path from "path";

const app = express();

// Middleware to serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse JSON bodies
app.use(express.json());

interface TUser {
  name: string;
  email: string;
}

let users: TUser[] = [];

app.get("/Hello", (req: Request, res: Response) => {
  res.json({ msg: "Hello World!" });
});

app.get("/echo/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({ id });
});

app.post("/sum", (req: Request, res: Response) => {
  const { numbers } = req.body;
  if (Array.isArray(numbers)) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    res.json({ sum });
  } else {
    res.status(400).json({ msg: "Invalid body" });
  }
});


app.post("/users", (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (name && email) {
    const newUser: TUser = { name, email };
    users.push(newUser);
    res.json({ message: "User successfully added" });
  } else {
    res.status(400).json({ error: 'Name and email are required' });
  }

});

app.get("/users", (req: Request, res: Response) => {
  res.status(201).json(users);
});

if (process.env.NODE_ENV !== "test") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export { app, users, TUser };
