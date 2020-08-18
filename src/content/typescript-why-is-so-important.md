---
title: TypeScript, why is so important?
date: 2020-08-16
path: /typescript-why-is-so-important
abstract: Step by step tutorial about TypeScript. Why types are so important.
tags: ["javascript", "typescript"]
readingtime: 6 minutes, 34 seconds
author: Wilman Arambillete
---

## Why do types exist in the first place?

Classic programming languages like Pascal, C, C++ and others have been well known as _strong typed_ languages. This means that in those languages stricter typing rules had to be set at compile time.

Every time you declared a variable or a function argument you had to clearly state their type before using them. The reason behind this concept goes way back in time, with the so called _type theory_ seeking to ensure that programs have meaning.

The hardware is unable to discern types. These could be considered more as a human abstraction that enable programmers to think at a higher level, at the time it makes code more expressive and clear.

In addition, it offers advantages from a compiler's perspective such as _optimization_. Type checking at compile time helps the compiler to use machine instructions in a more efficient way. _Safety_ is another important aspect to take into account, since a strong type system help the compiler to detect errros in advance.

With the advent of new interpreted languages like Basic, JavaScript, PHP, Python where type checking was done at runtime, programmers got used to avoid compiling their code. Then, languages became smarter at detecting types based on context and data.

## Back to the roots

Far from starting a new debate about _strong typing_ vs _loose typing_, we must understand that every language has been created with one specific purpose in mind and no one could forsee that a scripting language like JavaScript would become so popular that it would be extensively used for developing business applications.

Therefore, adding strong typing capabilities to a _loosely-typed_ language like JavaScript, not only helps development teams to produce cleaner and better documented code but also solves a fundamental problem: **catching type errors at compile time rather than at run time**.

## What is TypeScript?

JavaScript is a interpreted or dynamic compiled language, so there is no need for the developer to actually compile the code before running the program. Therefore, when we describe TypeScript as a _Typed Superset of Javascript_, it means that it provides developers with a new set of statements that enable them to add types to a _loosely-typed_ language like JavaScript.

For instance, when we declare a variable in JavaScript there is no need to determine what type it is. When using TypeScript you must add the type when declaring it, although you could opt-out to set the type if you assign a value to it.

```typescript
let isDone: boolean
let decimal: number
let big: bigint
let color: string
let name = "John"
```

Unlike Javascript (_.js_), TypeScript files use the _.ts_ extension. Browsers are unaware of the existence of TypeScript, therefore it is necessary to pre-process TS code to turn it into Javascript code. This conversion process is called **transpilation**.
Let's point out this subtle distinction:

- When _compiling_, the source code is transformed into another language
- When _transpiling_, the source code is transformed into another language with a similar level of abstraction

Truth to be told, I had to clarify this concept because I have bumped into this term several times and purists make this distinction. However, at this post, as well as in the TypeScript official documentation, for the sake of reading clarity we may equally use either _compile_ or _transpile_ terms to refer to _transpilation_.

## Installation

In order to use TypeScript we can use either `npm` or `yarn`

```bash
yarn add typescript
```

or

```bash
npm install typescript
```

Then, once we create our TS file, we can compile it by using the `tsc` command

```bash
npx tsc
```

## Configuration

We could create TS files in our project and then compile it through the `tsc` command at the terminal. Let's say we create a file called: `app.ts`

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}
```

Then, from the command line we execute:

```bash
npx tsc app.ts
```

a new file called app.js will be generated with the following content:

```javascript
function add(num1, num2) {
  return num1 + num2
}
```

However, there are simpler ways to go. The easiest one is to create a `tsconfig.json` file at the root of your JS project and let the compiler to take decisions based on this configuration.

```json
{
  "compilerOptions": {
    "target": "es6",
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "commonjs",
    "removeComments": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

This configuration file is divided by sections. As we can see this is a basic sample configuration file where we use the following options:

- _target_: It determines the JS version it supports: _ES3, ES5, ES6 ..._
- _rootDir_: It determines the root dir for your source code (.ts files)
- _outDir_: It determines the output dir for _compiled_ JS files
- _module_: It sets the module system for the program: _common.js, UMD, AMD, ..._
- _removeCommments_: It removes comments from the compiled code, it is considered a _best practice_
- _include_: It determines the folders where the source code resides
- _exclude_: It determines what folders or files to exclude from the compilation process

After defining a new configuration file for TypeScript, we are ready to move on and work on multiple JavaScript files located in our `src` folder. Then, all we need to do is run `npx tsc` from the command line, so files can be compiled and moved to the distribution folder.

We could also make `tsc` to be called from one of the tasks at the `package.json` and even define `watch` options to automatically run `tsc` every time our code is modified.

Depending on the technolgy you use and your type of project, there are multiple ways to set TypeScript up.
We won´t show every possible configuration scenario in this post, so we encourage the reader to go ahead and read the <a href="https://www.typescriptlang.org/docs/handbook/tsconfig-json.html" target="_blank">Official TypeScript Documentation</a> in order to explore more options.

## How should we use TypeScript?

TypeScript is nothing but a tool that helps developers to use best practices in software development by adding stricter rules to define data types. But this should go hand in hand with other good practices like scoping variables appropriately by using `let` or `const` instead of `var`.

### Basic Types

Let's review the types TS has to offer

#### Boolean, Number and String

These are the basic ones and should be declared as follows:

```typescript
let isDone: boolean = false
let decimal: number = 6
let hex: number = 0xf00d
let binary: number = 0b1010
let octal: number = 0o744
let big: bigint = 100n
let color: string = "blue"
```

#### Arrays

Arrays types can be written in two ways:

```typescript
let list: number[] = [1, 2, 3]
```

or

```typescript
let list: Array<number> = [1, 2, 3]
```

#### Tuples

Let's say we need to create an array where the first element should be a `string` and the second one a `number`. For this and other scenarios we will use something called `Tuple`:

```typescript
let x: [string, number]
x = ["hello", 10]
```

It is important to understand that TS imposes strict control on types and the order they are declared, so based on the previous definition, something like this would not work

```typescript
x = [10, "hello"] // WRONG
```

#### Enums

Just like other languages such as C or C++, TypeScript also has the `enum` type for declaring multiple constants. However, unlike other languages, TS enum is way more flexible.

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green
```

Enums historically started with 0, so Red = 0, Green = 1 and Blue = 2. But in TS you could alter the sequence by doing this:

```typescript
enum Color {
  Red = 1,
  Green,
  Blue,
}
```

or assign different numbers to each constant

```typescript
enum Color {
  Red = 2,
  Green = 6,
  Blue = 5,
}
```

or even assign string values to each constant

```typescript
enum Color {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```

### Special types

So far we have seen how to define basic types. But adding strong typing verification to a _loosely-typed_ language causes a huge impact at many levels.

For example, suppose we are interacting with the DOM and we would like to get the value of an HTML element. We can indicate the type of it, but we must make sure it exists before retrieving their value.

```typescript
const elem = document.getElementById("elementId")! as HTMLInputElement
```

The exclamation sign at the end, tells TS that we take the risk of the assignment although TS cannot be certain there will be a value to retrieve from that element.

Another interesting case is when we need to indicate that a function will receive a parameter that could be string or number depending the case. In other words, the argument we are passing could be either a string or a number.

For this scenarios we can use the pipeline character (|) to concatenate all possible types it could receive:

```typescript
function combine(a: number | string, b: number | string): void {
  //logic to validate types and perform operations
}
```

The pipeline can also be used to indicate that specific strings are supported as parameters.

```typescript
function foo(color: 'yellow' | 'brown'){...}
```

In this example, the function accepts a string parameter that **_has_** to be either "yellow" or "brown" **_only_**.

Functions return types also present further challenges. For instance, if we want to create a function that throws errors, what data type should it return?

For cases like this, TS has another type called: **never**. This type of value _should never occur_. Therefore, it is always used in functions that throw exceptions.

```typescript
function error(msg: string): never {
  throw new Error("msg")
}
```

On the other hand, functions that return nothing should be declared as _void_.

```typescript
function message(msg: string): void {
  console.log("msg")
}
```

If we do not know what type of data it would be, we could use the _unknown_ keyword. In this case, TypeScript does not control what it comes in it. However, its type must be verified before being assigend to any other type.

```typescript
let input: unknown

//before assigning it we should check its type
if (typeof input === "string") {
  let name: string = input
}
```

Besides checking the type before assigning the value, we could even _cast_ the type to a type we know. _Casting_ in TypeScript is done as follows:

```typescript
let myinput: unknown
let mylength: number = (<string>input).length
```

or

```typescript
let myinput: unknown
let mylength: number = (input as string).length
```

There are cases where we do not want TS to check the type. For instance, when we use an external library we cannot control, or if we need to define a function that could potentially return any type. For these cases we should use _any_

```typescript
declare function getValue(key: string): any
const str: string = getValue("test")
```

### Interfaces

Like in many other languages, _interfaces_ are related to defining types. This definition must be respected when creating an object of this type.

So, let's suppose we have function that receives a user object. We could create an Interface to _give shape_ or _set typing rules_ for this object before using it.

```typescript
interface User {
  name: string
  age: number
}

function displayPersonalInfo(user: User) {
  console.log(`Name: ${user.name} - Age: ${user.age}`)
}
```

When creating interfaces we can also add a few modifiers like the _?_ sign, to indicate that an attribute could be null. Or even use the _readonly_ keyword, to set an attribute as immutable.

```typescript
interface Square {
  color?: string
  width?: number
}

interface Point {
  readonly x: number
  readonly y: number
}

let square: Square = {
  width: 14,
}
```

By the way, _readonly_ is an interesting keyword that could also be applied to other types. For instance, it exists an ReadonlyArray definition that allows developers to create an array where elements could not be modified.

```typescript
let a: number[] = [1, 2, 3, 4]
let ronumbers: ReadonlyArray<number> = a

ronumbers[0] = 4 //WRONG! It cannot be assigned

//But it could be used for iterating over its values for reading purposes
for (const num of ronumbers) {
  console.log(num)
}
```

### Classes

JavaScript supports the use of classes and therefore it is possible to use TypeScript within classes.

```typescript
class Rectangle {
  height: number
  width: number

  constructor(h: number, w: number) {
    this.height = h
    this.width = w
  }
}

const rectangle = new Rectangle(200, 10)
```

In TypeScript you can also use _private_, _public_, _protected_ and _static_ for the class attributes. Even when these modifiers are not supported by JavaScript yet, they are perfectly transpiled.

TypeScript also supports _inheritance_ and _abstract classes_.

### Generics

Last but not least, we must mention that one of the _key_ features of most popular OOP languages, is also present in TypeScript: **Generics**.

Reusable components are the foundation of every modern strong typed programming language and once we have introduced strong typing control to JavaScript, we must also provide a way for programmers to define functions that keep the same logic applied to different types of data.

For those who come from languages like C++, C#, Kotlin, Java or even Rust, they must be fully acquainted with this concept.

For the rest of the developers, we should say that _Generics_ are a way to declare an array, class or function that use a type unbenknownst to them during the declaration. This _generic_ type is represented by a letter (usually T), enclosed by _greater and less than_ symbols: _<T>_.

Any letter or letters can be used, as long as they are enclosed in _<>_. These letters are later used as tokens within the implementation logic and replaced by _actual types_ when the definition occurs.

```typescript
function myMax<T>(x: T, y: T): T {
  return x > y ? x : y
}

let intMax = myMax<number>(12, 50)

console.log(intMax)
```

In this example we define a function that compares two values and returns the biggest one. Notice that the actual type (_number_) is passed later.

## Conclusions

We may conclude that TypeScript, as a static type checker language, has added a new layer to improve JavaScript robustness as a frontend language.
As mere observers, we could also glimpse how most languages add similar features: _functional programming, lambda functions, strong typing, immutable variables, etc._

This is good because it shows maturity in the software industry. But it is also better for the new software developer and the ones to come.
