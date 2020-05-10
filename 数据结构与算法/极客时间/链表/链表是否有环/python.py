class Solution:
    def __init__(self):
        super().__init__()
    def hasCycle(self, head):
        slow = fast = head
        while slow and fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False
