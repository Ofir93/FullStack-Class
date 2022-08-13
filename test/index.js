var x = 1
function foo() {
    var y = 2
    function bar() {
        var z = 3
        function baz() {
            window.log(z)
            window.log(y)
            window.log(x)
            window.log(w)
        }
        baz()
    }
    bar()
}
foo()