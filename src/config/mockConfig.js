import Mock from 'mockjs'

function mockCofig() {
    Mock.mock(/\/login/, {
        'login|+1': true
    })
    Mock.mock(/\/sendcode/, {
        'code': true
    })
    Mock.mock(/\/imageH160/, {
        'image': '@image("750x160")'
    })
    Mock.mock(/\/biao/, {
        'biao|3': [{
            'id|+1': 1,
            'title': '@csentence(5)',
            'isActive|1': true,
            'year|1-100': 100,
            'day|10-20': 15,
            'money|100-1000': 500,
            'proess|1-100': 50
        }]
    })
    Mock.mock(/\/data/, {
        'data': [{
            'day': 4,
            'total': 2.00,
            'name': '@csentence(5)'
        }, {
            'day': 7,
            'total': 3.00,
            'name': '@csentence(5)'
        }, {
            'day': 7,
            'total': 3.00,
            'name': '@csentence(5)'
        }, {
            'day': 10,
            'total': 12.00,
            'name': '@csentence(5)'
        }, {
            'day': 10,
            'total': 12.00,
            'name': '@csentence(5)'
        }, {
            'day': 13,
            'total': 1.22,
            'name': '@csentence(5)'
        }, {
            'day': 15,
            'total': 3.52,
            'name': '@csentence(5)'
        }, {
            'day': 20,
            'total': 2.65,
            'name': '@csentence(5)'
        }, {
            'day': 27,
            'total': 9.18,
            'name': '@csentence(5)'
        }]
    })
}
export default mockCofig()
