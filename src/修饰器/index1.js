var counter = 0;

var add = function (target, name, descriptor) {
    console.log(target, name, descriptor);
    counter++;
};

@add
function foo() {
    console.log(counter);
}

foo();

// 编译会报错：Leading decorators must be attached to a class declaration.
