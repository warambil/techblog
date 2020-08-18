---
title: Javascript Arrays And Arrow Functions
date: 2020-08-12
path: /javascript-arrays-and-arrow-functions
abstract: Beginners introduction to what arrow functions are and how they can be used in functional programming
tags: ["javascript"]
readingtime: 6 minutes, 34 seconds
author: Wilman Arambillete
---

Functional programming has been around for a while now. And the use of lambda functions while processing collections and arrays have been extensively used in several popular languages like Python, Ruby, Kotlin, etc.

However, we can say that during the past few years, Javascript programmers fell in love with Arrow functions and their use with certain array methods.

The objective of this post is to encourage developers to embrace this new programming trend by showing the benefits of this new methodology, opposed to how we used to iterate and process arrays in the past.

## What are lambda functions?

Also known as anonymous functions, these expressions are not bound to any identifier. Anonymous functions are often passed as arguments to higher-order functions or are used as the result of a higher-order function that requires to return a function.

Here is a classic example of how to use an anonymous function:

```javascript
setTimeout(function() {
  console.log("This will be displayed in a second")
}, 1000)
```

As we can see, these functions do not require a name because they won't be invoked from the outside.

Another example would be assigning an anonymous function to a variable like this:

```javascript
let display = function() {
  console.log("Message in a bottle")
}

display()
```

We are then executing the function _through_ the variable it has been assigned to.

## Arrow functions

ES6 introduced a new way to define these anonymous functions called: _Arrow Functions_, which is nothing more than a syntactically shorter alternative for regular function expressions.

Let's see a basic comparison between classic anonymous functions and new arrow functions:

```javascript
let sum = function(a, b) {
  return a + b
}

let sum = (a, b) => {
  return a + b
}
```

Basically, we can see that we are omitting the function keword before the parenthesis, but what seduces developers the most, is the fact that we could also trim more keywords and make these expressions even shorter.

We could do something like this:

```javascript
let sum = (a, b) => a + b
```

Curly brackets and `return` can also be omitted when there is only one statement to return.

But wait, parenthesis from parameters could also be removed when there is only one parameter.

```javascript
let currency = n => `$ ${n}`

currency(80) // $80
```

Additionally, there are a couple of other interesting rules that apply to Arrow Functions:

- Rest parameters: `(p1, p2, ...rest) => { ... }`

- Default parameters: `(p1 = defaultValue) => { ... }`

- Destructuring within the parameter list

  ```javascript
  let sum = ([a, b] = [3, 3]) => a + b
  sum() // 6
  ```

### Arrow Functions limitations

Now, the million dollars question is: can I use these type of functions to replace every function declaration in JavaScript?

The short answer is no.

Here are set of considerations before deciding to use _Arrow Functions_

#### Arrow functions do not have `this` or `arguments`

Something called _lexical scoping_ is used to determine the value of `this` or `arguments`.

These type of functions do not have their own `this`, therefore its value is resolved in the lexical scope like a standard variable.

In simpler terms, this means that `this` or `arguments`within a an _Arrow Function_ will refer to the values of `this` and `arguments` in the environment the arrow function has been defined.

#### These functions cannot be used with `new`

Since Arrow functions lack of the prototype property, they cannot be used as constructors.

Depending on how functions have been declared, they can be classified as _callable_ or _constructable_.

Functions created through function declaration can be both, however _Arrow Functions_ can only be _called_.

## Arrays and Arrow Functions

So far we have seen how to correctly define and use Arrow Functions. Now, we are going to show how to properly use them while _filtering_, _transforming_ or _reducing_ arrays.

For this purpose, we are going to explore some interesting and extensively used methods that JavasScript Arrays have to offer:

- `filter()` : This method creates a new array with the elements that meet the condition imposed by the passed function

  In the following example, we are filtering the array by those persons who are over 30 years old.

  ```javascript
  const persons = [
    { name: "John", age: 35 },
    { name: "Anne", age: 24 },
    { name: "Tom", age: 41 },
    { name: "Andrew", age: 55 },
    { name: "Mary", age: 18 },
  ]

  const overThirty = persons.filter(person => person.age > 30)
  console.log(overThirty)
  // Array[{name: "John", age: 35},{name: "Tom", age: 41},{name: "Andrew", age: 55}]
  ```

- `map()` : This method creates a new array with the result of the passed function. This is a very useful method because it is a very fast way to perform a quick transformation of elements.

  For this example, let's suppose we have an array of employees and we would like to obtain their name and age in a new object.

```javascript
function getAge(birthDate) {
    const YEAR_MILLISECONDS = 1000*60*60*24*365.25;
    const today = new Date();
    const diff = today-birthDate;
    return Math.floor(diff/YEAR_MILLISECONDS);
}

const employees = [
    {name: "John", birthDate: new Date(1985,07,09)},
    {name: "Anne", birthDate: new Date(1996,05,20)},
    {name: "Tom", birthDate: new Date(1979,01,05)},
    {name: "Andrew", birthDate: new Date(1965,03,10)},
    {name: "Mary", birthDate: new Date(2002,02,15)}
]

employees.map(emp => {
    return {
        name: emp.name,
        age: getAge(emp.birthDate)
})


```

As we can see, `Array.map()` allows us to apply the tranformation with the arrow function we are passing to it. As a result we obtain a new array with new objects in a neat and simple way.

But wait, we could also use functional programming to take the output of this transformed data as the input of the `Array.filter()` and obtain the name of the employees who are over 30.

```javascript
employees.map(emp => {
    return {
        name: emp.name,
        age: getAge(emp.birthDate)
}).filter(emp => emp.age > 30)
```

In a nutshell, what makes this appealing enough is how we can combine different methods and make good use of lambda functions to simplify the programming style.

Before wrapping this up, let's analyse one more interesting array method.

- `reduce()` : This method executes the passed function (known as _reducer_), against each element and the resulting output is only one value.

This method is usually used to group or accumulate values. For instance, based on our past examples we could add _salary_ as another property for the Employee and we would like to obtain the total of it.

```javascript
const employees = [
  { name: "John", salary: 75000 },
  { name: "Anne", salary: 45000 },
  { name: "Tom", salary: 123000 },
  { name: "Andrew", salary: 80000 },
  { name: "Mary", salary: 65000 },
]
employees.reduce((total, emp) => (total += emp.salary), 0)
```

As shown in this example, we are passing a function called reducer with two parameters, the first one is the accumulator and the second one corresponds to the element.

In fact, the _reducer_ function could receive up to 4 parameters:

- _Accumulator_

- _Current value_

- _Current index_

- _Source array_

Whatever is returned from this function is _added_ to the accumulator, which is later returned as the only value.

> **Notice:** _The second parameter of the reduce method is the initialization value for the accumulator. If it is ommited, the first element of the array will be taken as initial value._

## Summary

Programming styles change along the years and we must keep up at the latest trends. It is interesting to observe though, how most languages out there are going towards the same direction.

For example, most of them offer **functional programming**, **lambda functions**, promote the use of **const variables over mutable ones** and offer strong **types**.

Even when Javascript is not _typed_ out of the box, we must not forget the rising popularity of [Typescript](https://www.typescriptlang.org/).

All in all, it is good to realize that to some extent we feel we are going on the right track.
