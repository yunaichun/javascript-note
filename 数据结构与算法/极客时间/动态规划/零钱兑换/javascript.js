/** https://leetcode.com/problems/coin-change/
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  /** a[i]: 代表爬凑 i 钱所需要的最少的硬币个数 */
  /** a[i] = Math.min(a[i], a[i - coins[j]] + 1) */
  const a = [];
  a[0] = 0;
  for (let i = 1; i < amount + 1; i++) {
    for (let j = 0; j < coins.length; j++) {
      if (!a[i]) a[i] = Infinity;
      if (i >= coins[j]) {
        a[i] = Math.min(a[i], a[i - coins[j]] + 1);
      }
    }
  }
  return a[amount] === Infinity ? -1 : a[amount];
};
