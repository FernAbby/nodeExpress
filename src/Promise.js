class Promise {
    constructor(fn) {
        fn(this.resolve, this.reject);
    }
    status = 'pending' // fulfilled、rejected
    result = '' // 保存promise的数据
    reason = '' // 保存promise的原因
    onFulfilledCb = [] // 存储then方法注册的回调函数, 第一个参数
    onRejectedCb = [] // 存储then方法注册的回调函数，第二个参数
   static resolve(data) {
        console.log('resolve===>', this);
        if (this.status !== 'pending') return;
        this.status = 'fulfilled';
        this.result = data;
        while (this.onFulfilledCb.length) {
            this.onFulfilledCb.shift()(this.result);
        }
    }
    static reject(reason) {
        console.log('reject===>', this);
        if (this.status !== 'pending') return;
        this.status = 'rejected';
        this.reason = reason;
        while (this.onFulfilledCb.length) {
            this.onRejectedCb.shift()(this.reason);
        }
    }
    then(successCallback, failCallback) {
        const promise = new Promise((resolve, reject) => {
            if (this.status === 'fulfilled') {
                successCallback && successCallback(this.result);
            } else if (this.status === 'rejected') {
                failCallback && failCallback(this.reason);
            } else {
                if (successCallback && typeof successCallback === 'function') {
                    const successResult = successCallback(this.result);
                    this.onFulfilledCb.push(promise, successResult, resolve, reject);
                }
                if (failCallback && typeof failCallback === 'function') {
                    this.onRejectedCb.push(failCallback);
                }
            }
        });
    }
    resolvePromise(promise, result, resolve, reject) {
        if (promise === result) {
            return reject(new TypeError('循环引用'));
        }
        let calledResult;
        if ((result !== null && typeof result === 'object') || typeof result === 'function') {
            try {
                let then = result.then;
                if (typeof then === 'function') {
                    then.call(result, y => {
                        if (calledResult) return;
                        calledResult = true;
                        this.resolvePromise(promise, y, resolve, reject);
                    }, r => {
                        if (calledResult) return;
                        calledResult = true;
                        // console.log(r)
                        reject(r);
                    })
                } else {
                    if (calledResult) return;
                    calledResult = true;
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        } else {
            resolve(result);
        }
    }
}

// https://blog.csdn.net/qq_42647547/article/details/124692701
