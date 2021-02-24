# Fuzzy-Testing

Fuzz testing tools for node.

Because javascript is a loosely typed language, it is difficult to prepare for all the different possible types that a function might receive. In order to better build stable javascript applications, fuzzy-testing is a tool that will try many possible combinations of data types within arguments.

To install to your local project, simply run:

```
npm install fuzzy-testing
```

then, call one of the fuzzFunctions from within your testing code. If you're using jest, you can do something like this:

```js
import { fuzzFunction } from 'fuzzy-testing';

expect(fuzzFunction(onlyBools, { maxArgs: 1 })).toEqual([]);
```

## fuzzFunction

`fuzzFunction` is a function that takes a function and an object specifying it's options.

#### options

- returnTypes: can be an array of types represented by strings, or a function that validates.
- returnFirstError: boolean that does short circuit evaluation if true.
- maxArgs: the maximum number of arguments to send to the function.
- minArgs: the minimum number of arguments to send to the function.
- argumentTypes: an array of argument types.
- argumentValues: an array of values that will be tested.
- iterations: the number of times that a function will be run per argument combination.
- canThrowError: whether or not the function can throw an error or not.

## fuzzReactComponent

Fuzzy testing also allows you to fuzz the render method of react component via `fuzzReactComponent`.

#### options

- returnTypes: can be an array of types represented by strings, or a function that validates.
- returnFirstError: boolean that does short circuit evaluation if true.
- argumentValues: an array of values that will be tested.
- iterations: the number of times that a function will be run per argument combination.
- canThrowError: whether or not the function can throw an error or not.
