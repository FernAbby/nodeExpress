const Util = {
   debounce(fn, delay, immediate = false) {
      let timer = null;
      return function (...args) {
         if (timer) {
            clearTimeout(timer);
         }
         // immediate 为 true 表示第一次触发后立即执行一次
         // timer 为空表示首次触发
         if (immediate && !timer) {
            fn.apply(this, args);
         }
         timer = setTimeout(() => {
            fn.apply(this, args);
         }, delay);
      };
   },
   debounceDecorator(delay, immediate = false) {
      return function(target, name, descriptor) {
         const fn = descriptor.value;
         let timer = null;
         return function(...args) {
            if (timer) {
               clearTimeout(timer);
            }
            if (immediate && !timer) {
               fn.apply(this, args);
            }
            timer = setTimeout(() => {
               fn.apply(this, ...args);
            }, delay);
         }
      }

   },
   throttle1(fn, delay) {
      let timer = null;
      return function(...args) {
         // 在时间结束后触发
         if (!timer) {
            timer = setTimeout(() => {
               timer = null;
               fn.apply(this, args);
            }, delay);
         }
      }
   },
   throttle(fn, delay) {
      let lastTime = null;
      return function(...args) {
         const currentTime = (new Date()).getTime();
         // 在时间开始前触发
         if (lastTime || currentTime - lastTime > delay) {
            fn.apply(this, args);
            lastTime = (new Date()).getTime();
         }
      }
   },
   throttleDecorator(delay) {
      return function (target, name, descriptor) {
         let lastTime = null;
         return function(...args) {
            const currentTime = (new Date()).getTime();
            if (!lastTime || currentTime - lastTime > delay) {
               descriptor.value.apply(this, args);
            }
         }
      }
   },
}

Function.prototype.bind = function() {
   const args = Array.prototype.slice.call(arguments);
   // const args = [].slice.call(arguments);
   // const args = Array.from(arguments);
   // const args = [...arguments];
   const t = args.shift()
   const that = this;
   return function() {
      console.log('this===>2', that);
      return that.apply(t, args)
   }
}

let name = 'window';
const person = {
   name: 'person',
   foo: function() {
      console.log('person===>', this.name);
   },
};
const user = {
  name: 'user',
  foo: function() {
      console.log('user===>', this.name);
  },
};

person.foo.bind(user)();
user.foo.bind(person)();



