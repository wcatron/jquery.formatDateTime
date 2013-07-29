/*global test:false, equal:false, module:false*/
var Tester = Tester || {};

(function($, Tester) {

    var cases = {
        'Mon, 09 Jul 2012 20:29:54': [
            ['yy-mm-dd hh:ii:ss.u a', '2012-07-09 20:29:54.0 PM'],
            ['m/d/y g:ii:ss a', '7/9/12 8:29:54 PM'],
            ['DD, MM d, yy', 'Monday, July 9, 2012'],
            ['D, M d, yy', 'Mon, Jul 9, 2012']
        ],
        '2012/07/05 09:55:03': [
            ['mm/dd/y g:ii a', '07/05/12 9:55 AM'],
            ['mm/dd/y h:ii', '07/05/12 9:55'],
            ['o, yy hh:ii', '187, 2012 09:55']
        ],
        '2012/01/01 00:00:00': [
            ['mm/dd/y gg:ii:ss.u a', '01/01/12 12:00:00.0 AM'],
            ['mm/dd/y hh:ii:ss.uu a', '01/01/12 00:00:00.000 AM']
        ]
    };

    Tester.run = function() {

        module('jQuery#formatDateTime', {
            setup: function() {
                $('#qunit-fixture').append('<span/>');
                this.target = $('#qunit-fixture span');
            },
            teardown: function() {
                $('#qunit-fixture').empty();
                this.target = undefined;
            }
        });

        test('test date formatting, direct input', function() {
            for (var date in cases) {
                for (var i = 0; i < cases[date].length; i++) {
                    var format = cases[date][i][0];
                    var expected = cases[date][i][1];
                    var rv = $.formatDateTime(format, new Date(date));
                    equal(rv, expected, 'Formatting ' + date + ' as ' + format);
                }
            }
        });

        test('test date formatting in default attribute', function() {
            for (var date in cases) {
                this.target.attr('data-datetime', date);
                for (var i = 0; i < cases[date].length; i++) {
                    var format = cases[date][i][0];
                    var expected = cases[date][i][1];
                    var rv = this.target.formatDateTime(format).text();
                    equal(rv, expected, 'Formatting ' + date + ' as ' + format);
                }
            }
        });

        test('test date formatting in custom attribute', function() {
            var opts = {attribute: 'foo'};
            for (var date in cases) {
                this.target.attr('foo', date);
                for (var i = 0; i < cases[date].length; i++) {
                    var format = cases[date][i][0];
                    var expected = cases[date][i][1];
                    var rv = this.target.formatDateTime(format, opts).text();
                    equal(rv, expected, 'Formatting ' + date + ' as ' + format);
                }
            }
        });

        test('test date formatting in dom content', function() {
            for (var date in cases) {
                for (var i = 0; i < cases[date].length; i++) {
                    this.target.text(date);
                    var format = cases[date][i][0];
                    var expected = cases[date][i][1];
                    var rv = this.target.formatDateTime(format).text();
                    equal(rv, expected, 'Formatting ' + date + ' as ' + format);
                }
            }
        });

        test('test date formatting, custom AM/PM', function() {
            var opts = {ampmNames: ['FOO', 'BAR']};
            for (var date in cases) {
                for (var i = 0; i < cases[date].length; i++) {
                    var format = cases[date][i][0];
                    var expected = cases[date][i][1]
                        .replace('AM', 'FOO')
                        .replace('PM', 'BAR');
                    var rv = $.formatDateTime(format, new Date(date), opts);
                    equal(rv, expected, 'Formatting ' + date + ' as ' + format);
                }
            }
        });
    };

}(jQuery, Tester));
