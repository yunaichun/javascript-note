// == leetcode: https://leetcode.com/problems/valid-anagram/
class Solution {
    constructor() {
    }
    // o(nlogn)
    isAnagram(s, t) {
        s.split('').sort().join('') === t.split('').sort().join('')
    }
}

class Solution2 {
    constructor() {
        super(props)
    }
    // o(n)
    isAnagram(s, t) {
        let [dic1, dic2] = [{}, {}];
        for (item in s) {
            dic1[item] = (dic1[item] || 0) + 1;
        }
        for (item in s) {
            dic2[item] = (dic2[item] || 0) + 1;
        }
        return JSON.stringify(dic1) === JSON.stringify(dic2);
    }
}
