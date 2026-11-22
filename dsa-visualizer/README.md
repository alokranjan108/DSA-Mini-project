# DSA Algorithm Visualizer

Interactive platform for learning Data Structures and Algorithms. Every module runs the real algorithm, records each step, and lets you play, pause, step and reset it.

## Folder structure
```
dsa-visualizer/
├── app.py                 Flask server + SQLite run history (/api/runs)
├── requirements.txt
├── README.md              this documentation
└── static/
    ├── index.html         app shell
    ├── css/style.css      dark theme, responsive layout, animations
    └── js/
        ├── algorithms.js  pure algorithm generators (sorting, search, BST, BFS/DFS/Dijkstra)
        ├── ui.js          Player (play/pause/step), controls, helpers
        └── views.js       one view per module + complexity data + router
```

## Run locally
Option A (no install): open `static/index.html` in a browser. Everything works; run history is disabled.

Option B (full stack):
```
python -m venv venv
venv\Scripts\activate        # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000

## How it works
Each algorithm is a JavaScript generator that yields a step object (array state, highlighted indices, message). `Player` collects the steps and replays them with a timer, so Start, Pause, Step and Reset all work off the same list. Stack, queue, linked list and BST insert/delete are direct operations that redraw state. Traversals, searches and graph algorithms reuse `Player`. Sorting and graph runs are POSTed to Flask and stored in SQLite, then shown on the Overview page.

## Modules
Sorting (bubble, selection, insertion, merge, quick) · Searching (linear, binary) · Stack (overflow/underflow) · Queue (linear + circular, front/rear markers) · Linked list (head/tail/position insert, delete, search, traverse) · BST (insert, delete, in/pre/post-order) · Graphs (BFS, DFS, Dijkstra with custom edges).

## Viva questions and answers
1. **Stack vs queue?** Stack is LIFO (one open end); queue is FIFO (insert at rear, remove at front).
2. **What is stack overflow/underflow?** Pushing onto a full stack / popping an empty one.
3. **Why a circular queue?** A linear array queue wastes freed front slots; circular uses `(i+1) % size` to reuse them.
4. **Array vs linked list?** Array: O(1) index access, contiguous, costly insert. Linked list: O(1) head insert, dynamic size, O(n) access.
5. **Why is binary search O(log n)?** Each comparison halves the range. It needs sorted data.
6. **Merge sort vs quick sort?** Merge: guaranteed O(n log n), stable, O(n) extra space. Quick: O(n log n) average, O(n²) worst, in place, usually faster in practice.
7. **Which sorts are stable?** Insertion, merge, and (usually) bubble. Selection and quick are not.
8. **Best case of insertion sort?** O(n) on already sorted data.
9. **BST property and inorder result?** Left < node < right; inorder gives ascending order.
10. **How do you delete a BST node with two children?** Replace it with its inorder successor (smallest in right subtree), then delete that successor.
11. **Worst case of a BST?** O(n) when keys are inserted in sorted order (skewed tree); fix with AVL/Red-Black trees.
12. **BFS vs DFS?** BFS uses a queue, goes level by level, finds shortest path in unweighted graphs. DFS uses a stack/recursion and goes deep first.
13. **Why can't Dijkstra handle negative edges?** It assumes a finalised node has the shortest distance; a negative edge could later improve it. Use Bellman-Ford.
14. **Dijkstra complexity?** O(V²) with an array, O((V+E) log V) with a min-heap.
15. **Why Flask and SQLite here?** Flask serves the app and exposes a tiny REST API; SQLite stores run history without a separate DB server.
