class Solution:
    def __init__(self):
        super().__init__()
    def reverseList(self, head):
        prev, cur = None, head
        while cur:
            cur.next, prev, cur = prev, cur, cur.next
        return prev
