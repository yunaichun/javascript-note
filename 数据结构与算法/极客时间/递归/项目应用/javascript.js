const data = [
    {
        check: false,
        id: '11',
        parent_id: '1'
    },
    {
        check: true,
        id: '12',
        parent_id: '1',
        children: [
            {
                check: true,
                id: '21',
                parent_id: '12',
                children: [
                    {
                        check: false,
                        id: '211',
                        parent_id: '21'
                    }
                ]
            }
        ]
    },
    {
        check: false,
        id: '13',
        parent_id: '1'
    },
    {
        check: true,
        id: '14', // == i = 1, j = 0
        parent_id: '1',
        children: [
            {
                check: true,
                id: '41', // == i = 1, j = 1
                parent_id: '14',
                children: [
                    {
                        check: true,
                        id: '411', // == i = 1, j = 2, 
                        parent_id: '41'
                    },
                    {
                        check: true,
                        id: '522', // == i = 2, j = 2
                        parent_id: '41'
                    }
                ]
            },
            {
                check: true,
                id: '42', // == i = 3, j = 1
                parent_id: '14'
            },
            {
                check: false,
                id: '43',
                parent_id: '14'
            },
            {
                check: false,
                id: '44',
                parent_id: '14'
            },
            {
                check: true,
                id: '45', // == i = 4, j = 1
                parent_id: '14'
            }
        ]
    }
];

const result = [
    ['12', '21'],
    ['14', '41', '411'],
    ['14', '41', '522'],
    ['14', '42'],
    ['14', '45']
];

// == 深度递归
function _dfs(arr = [], i = 0, j = 0, res = []) {
    for (let d = 0, len = arr.length; d < len; d++) {
        if (arr[d].check) {
            if (!res[i]) res[i] = [];
            if (res[i - 1]) res[i] = res[i - 1].slice(0, j);
            res[i][j] = arr[d].id;
            if (arr[d].children) _dfs(arr[d].children, i, j + 1, res);
            i = Math.max(i + 1, res.length);
        }
    }
    return res;
}
