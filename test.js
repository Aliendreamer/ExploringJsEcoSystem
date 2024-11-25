function climbingLeaderboard(ranked, player) {
	let uniqueRanks = [...new Set(ranked)];

    let result = [];
    let index = uniqueRanks.length - 1; // Start from the end of the uniqueRanks list

    for (let score of player) {
        while (index >= 0 && score >= uniqueRanks[index]) {
            index--;
        }
        result.push(index + 2);
    }

    return result;
}
const x = climbingLeaderboard([100,100,50,50, 40,40,20,10], [5, 25,40, 50,120]); // [4, 3, 1]
console.log(x);
// expect [6, 4, 2, 1]
// 100 50 40 20 10