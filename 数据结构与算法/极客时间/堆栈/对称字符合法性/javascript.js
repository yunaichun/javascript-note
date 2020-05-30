// == leetcode: https://leetcode.com/problems/valid-parentheses/
class Solution {
    constructor(props) {
    }
    // o(1) * n
    isValid(s) {
        let stack = []
        const paren_map = { ')': '(', ']': '[', '}': '{' }
        let keys = Object.keys(paren_map)
        for (let i = 0, len = s.length; i < len; i++) {
            if (keys.indexOf(s[i]) < 0) {
                // == 左括号 push
                stack.push(s[i])
            } else if (paren_map[s[i]] != stack.pop()) {
                return false
            }
        }
        return !stack.length
    }
}

class Solution2 {
    constructor(props) {
        super(props)
    }
    isValid(s) {
        let length
        while (length !== s.length) {
            length = s.length
            s = s.replace('()', '').replace('{}', '').replace('[]', '')
        }
        return !s.length
    }
}
