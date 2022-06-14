class Math {
    @log
    add(a, b) {
        return a + b;
    }
}

function log(target, name, descriptor) {
    const oldValue = descriptor.value;

    descriptor.value = function() {
        console.log(`Calling ${name} with===>`, oldValue, this, arguments);
        return oldValue.apply(this, arguments);
    };

    return descriptor;
}

const math = new Math();

math.add(1, 6);
