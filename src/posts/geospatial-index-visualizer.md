# How spatial indexes actually find things near you

I've been reading about how apps like Uber and Google Maps handle proximity queries — "find all drivers within 2 km" type stuff. There are a bunch of different spatial indexing algorithms that make this fast, and I kept seeing the same names come up: Geohash, Quadtree, S2, H3. But reading about them wasn't really making things click.

So I built a thing where you can actually watch each algorithm search on a real map.

Repo: [`arsh14jain/geospatial-index-visualizer`](https://github.com/arsh14jain/geospatial-index-visualizer)

---

## The basic problem

You have 10,000 points on a map. Someone gives you a location and says "give me everything within 2 km."

The dumb way: loop through all 10,000, calculate the distance for each, keep the close ones. That's fine for small datasets but it's O(n) every time. Not great when you have millions of points and need answers in milliseconds.

Spatial indexes solve this by organizing points by location so you can skip most of them. But there are different ways to do that, and they each have trade-offs that are hard to appreciate until you see them side by side.

---

## What I built

The app drops 10,000 random points in the Bangalore area and lets you query them using five different algorithms. You click on the map, set a search radius, and the visualization shows:

- which regions the algorithm decided to look at (blue rectangles, or pink hexagons for H3)
- which points it pulled out as candidates (yellow)
- which ones actually ended up within the radius (green)

There's also a sidebar that shows how many distance calculations each algorithm had to do, so you can compare the work directly.

---

## The algorithms

I implemented all five from scratch in TypeScript. No geo libraries — I wanted to understand what's actually happening inside each one.

**Brute force** is just the baseline. Checks every single point. Exists so you can see how much work the others skip.

![Brute force](/geo-bruteforce.jpeg)

**Geohash** divides the map into a fixed grid. Each cell gets a string code like `tdr1w`, and points with the same prefix are nearby. To search, you grab the cell your query is in plus its neighbors and only check those points. Elasticsearch uses this. Simple, but the cells are all the same size whether they have 1 point or 1,000.

![Geohash](/geo-geohash.jpeg)

**Quadtree** starts with one big rectangle and recursively splits it into four whenever a region gets too crowded. When searching, it checks if each node's bounding box overlaps the search circle — if not, it skips the entire subtree. So it naturally adapts to where the points actually are. Dense clusters get fine splits, empty areas stay coarse.

![Quadtree](/geo-quadtree.jpeg)

**S2** is Google's system. It projects the Earth onto a cube and recursively subdivides each face. The interesting part is its covering algorithm — given a search circle, it finds the smallest set of cells (at potentially different levels) that fully covers it. Google Maps and Uber use this.

![S2](/geo-s2.jpeg)

**H3** is Uber's system. Hexagons instead of rectangles. The reason for hexagons: every neighboring cell is the same distance away. With squares, diagonal neighbors are farther than edge neighbors, which makes distance calculations inconsistent. To search, you start at the center hex and expand outward in rings. Uber uses this for surge pricing, DoorDash for delivery zones.

---

## How it actually works under the hood

Every algorithm follows the same two-step pattern:

1. Use the index to quickly grab a rough set of candidate points (fast, but includes some false positives)
2. Check each candidate with the actual [Haversine distance](https://en.wikipedia.org/wiki/Haversine_formula) formula and throw out the ones that are too far

The difference between algorithms is just step 1 — how they decide which points are worth checking. Step 2 is always the same exact distance calculation.

This was probably the most useful thing I took away from building this. Every spatial index is basically "skip as many distance calculations as possible."

---

## Running it

```bash
git clone https://github.com/arsh14jain/geospatial-index-visualizer.git
cd geospatial-index-visualizer
npm install
npm run dev
```

Opens on `localhost:3000`. Click anywhere on the map and switch between algorithms to see the difference. The brute force one lights up the entire map since it checks everything — then switch to something like quadtree and watch it prune.

The whole thing runs client-side with Leaflet for the map. No backend.
