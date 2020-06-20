class LRUCache:
    def __init__(self, capacity):
        super().__init__()
        self.capacity = capacity
        self.cache = dict()
    
    def get(self, key):
        if key not in self.cache:
            return -1;
        value = self.cache.get(key, None)
        self.cache.pop(key)
        self.cache.setdefault(key, value)
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.pop(key)
        self.cache.setdefault(key, value)
        if len(self.cache) > self.capacity:
            self.cache.pop(list(a.keys())[0])
