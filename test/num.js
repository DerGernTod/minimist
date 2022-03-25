var parse = require('../');
var test = require('tape');

test('nums', function (t) {
    var argv = parse([
        '-x', '1234',
        '-y', '5.67',
        '-z', '1e7',
        '-w', '10f',
        '--hex', '0xdeadbeef',
        '789'
    ]);
    t.deepEqual(argv, {
        x : 1234,
        y : 5.67,
        z : 1e7,
        w : '10f',
        hex : 0xdeadbeef,
        _ : [ 789 ]
    });
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv.y, 'number');
    t.deepEqual(typeof argv.z, 'number');
    t.deepEqual(typeof argv.w, 'string');
    t.deepEqual(typeof argv.hex, 'number');
    t.deepEqual(typeof argv._[0], 'number');
    t.end();
});

test('already a number', function (t) {
    var argv = parse([ '-x', 1234, 789 ]);
    t.deepEqual(argv, { x : 1234, _ : [ 789 ] });
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv._[0], 'number');
    t.end();
});

test('large nums', function (t) {
    var argv = parse([
        '-v', '555555555555555555',
        '-w', '55555555555555555',
        '-x', '5555555555555555',
        '-y', '10000000000000005',
        '-z', '10000000000000095',
        '5555555555555555555'
    ]);
    t.deepEqual(argv, {
        v : 555555555555555555n,
        w : 55555555555555555n,
        x : 5555555555555555,
        y : 10000000000000005n,
        z : 10000000000000095n,
        _ : [ 5555555555555555555n ]
    });
    t.deepEqual(typeof argv.v, 'bigint');
    t.deepEqual(typeof argv.w, 'bigint');
    t.deepEqual(typeof argv.x, 'number');
    t.deepEqual(typeof argv.y, 'bigint');
    t.deepEqual(typeof argv.z, 'bigint');
    t.deepEqual(typeof argv._[0], 'bigint');
    t.end();
});