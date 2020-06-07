import math

class Solution:
    def __init__(self):
        super().__init__()

    def coinChange(self, coins, amount):
        a = []
        a[0] = 0;
        for i in range(1, amount + 1):
            for j in range(0, len(coins)):
                if i - coins[j] > -1:
                    if a[i]:
                        a[i] = math.min(a[i], a[i - coins[j]] + 1);
                    else:
                        a[i] = a[i - coins[j]] + 1
        return a[amount] > amount and -1 or a[amount];
