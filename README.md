# Driftboard — Kanban Board

A drag-and-drop Kanban board built for the **Syntecxhub Internship Program**
(Front-End Development track, Project 2).

Organize tasks across **To-Do → Doing → Done**, dragging cards between
columns. Everything is saved to `localStorage`, so the board is still there
when you come back.

## Features

- Draggable task cards between columns (To-Do, Doing, Done)
- Built with the native **JavaScript Drag and Drop API** (no libraries)
- Board state persisted in `localStorage`
- Add or remove tasks from any column
- Live task counts per column
- Simple color coding per column (blue / amber / green)
- Fully responsive: stacks into a single column on mobile
- "Clear board" action to reset everything

## Tech Stack

- HTML5
- CSS3 (grid, flexbox, custom properties)
- Vanilla JavaScript (ES6+, HTML5 Drag and Drop API, Web Storage API)

## Getting Started

1. Clone or download this repository.
2. Open `index.html` directly in your browser — no build step, no
   dependencies, no server required.
3. Add tasks with the input at the top of each column, then drag them
   between columns as work progresses.

## Project Structure

```
Syntecxhub_Kanban_Board/
├── index.html      # Markup / structure
├── style.css        # Styling
├── script.js        # Drag & drop logic + localStorage persistence
└── README.md
```

## Author

Submitted as part of the **Syntecxhub Internship Program** —
Front-End Development track.

- LinkedIn: shared with `@Syntecxhub` mentioned per program instructions
- Company: [www.syntecxhub.com](https://www.syntecxhub.com)
