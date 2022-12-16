const fs = require("fs")
const performance = require("perf_hooks").performance
const eol = require("os").EOL
 
let startTime = performance.now()
let part1 = (part2 = 0)
 
function mDistance(x, y, x2, y2) {
    return Math.abs(x - x2) + Math.abs(y - y2)
}
 
let input = fs
    .readFileSync(__dirname + "/input.txt", "utf8")
    .split(eol)
    .map((s) => {
        let [x, y, bx, by] = s.match(/-?\d+/g).map(Number)
        let distance = mDistance(x, y, bx, by)
        return { x, y, bx, by, distance }
    })
 
let y = input.length == 14 ? 20 : 2000000
let maxSize = input.length == 14 ? 20 : 4000000
let ranges = []
input.forEach((s, i) => {
    let dy = s.distance - Math.abs(y - s.y)
    if (dy > 0) {
        let [lx, rx] = [s.x - dy, s.x + dy]
        ranges.push([lx, rx])
    }
})
ranges = ranges.flat().sort((a, b) => a - b)
part1 = Math.abs(ranges[0] - ranges.pop())
 
function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)
    return [~~x, ~~y]
}
let diamonds = []
input.forEach((sensor) => {
    let d = sensor.distance + 1
    let diamond = []
    diamond[0] = [sensor.x + d, sensor.y]
    diamond[1] = [sensor.x, sensor.y + d]
    diamond[2] = [sensor.x - d, sensor.y]
    diamond[3] = [sensor.x, sensor.y - y]
    diamonds.push(diamond)
})
 
main: for (let i = 0; i < diamonds.length; i++) {
    const d1 = diamonds[i]
    for (let j = i + 1; j < diamonds.length; j++) {
        const d2 = diamonds[j]
        for (let s1 = 0; s1 < 4; s1++) {
            for (let s2 = 0; s2 < 4; s2++) {
                let [xi, yi] = intersect(...d1[s1], ...d1[(s1 + 1) % 4], ...d2[s2], ...d2[(s2 + 1) % 4])
                if (
                    xi >= 0 &&
                    xi <= maxSize &&
                    yi >= 0 &&
                    yi <= maxSize &&
                    input.every((s) => mDistance(s.x, s.y, xi, yi) > s.distance)
                ) {
                    console.log(xi, yi)
                    part2 = xi * 4000000 + yi
                    break main
                }
            }
        }
    }
}
let time = performance.now() - startTime
console.log(`Part 1: ${part1}\nPart 2: ${part2}\nTimer: ${time} ms`)
