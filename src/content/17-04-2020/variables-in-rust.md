---
title: Variables in Rust
date: 2020-04-17
path: /variables-in-rust
abstract: This post explores how variables and memory are managed by the  Rust programming language. Concepts like ownership, sharing and borrowing are explained here.
tags: ["programming","rust"]
author: Wilman Arambillete
---

Lately there has been a lot of fuss around the __Rust__ programming language developed by the Mozilla team around 2010. 

The reality is that this language that was created as an alternative to C++ has gained popularity once it has become more mature, due to the following key features:

- Safety
- Great performance
- Packaging and distribution
- Helpful community

The objective of this post is to learn more about how Rust handles variables and memory to catch errors at compile time rather than in runtime. This is one of the features that makes it the safe language of choice for critical applications.

Rust applies a concept called:  *linear types*. This means that is based on a *linear logic* that ensures that objects are only used once and then safely removed or deallocated. 

Linear type systems allow references but not aliases. In Rust variables are immutable by default, therefore the following code triggers a compile error

```rust
fn main() {
    let x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

If you really need to modify a variable once a value has been assigned to it, you must specify it this way:

```rust
fn main() {
    let mut x = 5;
    println!("The value of x is: {}", x);
    x = 6;
    println!("The value of x is: {}", x);
}
```

Now, you must be wondering why immutability should be a *de-facto* feature and how this may contribute to a produce a safer code. 

Then you should understand another Rust concept in  memory management: ***Ownership***.

## Understanding Ownership

Rust does not have a garbage collector like Java or other languages. Its philosophy is based on the premise that whoever declares a variable should own it until the end of the flow. But before digging into this concept, we need to refresh a few old concepts about memory: ***stack*** and ***heap***.

Even when *stack* and heap are memory spaces available to be used during runtime, their structure differs. *Stack* works in a LIFO (*last in, first out*) fashion, meaning it stores values in the order it arrive and remove them in the opposite order. 

The most important concept about *stack* is that all data stored there must have a known, fixed size. If we don´t know the size of what we are going to store, then we should use the *heap*. 

*Heap* is less organized and whenever you need to put data on the *heap*, you request a certain amount of space, the operating system finds an  empty spot that could fit and returns a pointer, which holds the address of that location in memory. This process is called *allocating*.

Pushing values onto the stack is not considered allocating since the reserved space for data is known before hand. Thus, using the stack is faster than allocating on the heap because the operating system does not have to search for a new place to store data. Data in the stack is always on top. 

When a function is called, the values passed into the function as well as the function's local variables get pushed onto the stack. When the function is over, those values get removed from the stack.

Now, historically the main problem with languages that allow developers to allocate data in the heap (using pointers), was keeping track of what parts of code are using what data on the heap and the deallocation of unused data from the heap. This is what the Rust concept of  **ownership** attempts to solve.

*Each value in Rust has a variable that could be seen as its owner and each variable can have one owner at a time. Whenever the owner goes out of scope, the value is gone.*

Let's see the following example:

```rust
let s = String::from("hello");
```

Here we are using a variable that *points* to a String structure in memory. The string structure is allocated in the heap area and *s1* is a variable that has information about the address of the String structure, its length and capacity.

Now, the *s* variable is *immutable* by default, so if we wanted to modify the String data, we should do this:

```rust

let mut s = String::from("hello");

s.push_str(", world!"); // push_str() appends a literal to a String

println!("{}", s); // This 
```

The *mut* keyword lets Rust know about the variable mutability. 

Now, here comes the interesting part about ownership, let's take a look at the following code:

```rust
let s1 = String::from("hello");
let s2 = s1;
```

In this case, *s1* is assigned to *s2*, therefore if we think of other languages like C++, both *s2* and *s1* would be pointing to the same structure. So, after the assignment in the same function I should be able to do this:

```rust
println!("{}, world!", s1);
```

However this code fails in Rust because once *s1* has been assigned to *s2*, *s1* does not belong the owner so it is not longer valid. This is what ownership is about. This way, Rust does not have to worry about keeping track of scenarios where the structure is removed from *s2* and *s1* may remain orfan.

At this point you may ask, is there then a way to actually deep copy structures and make *s1* and *s2* point to a valid structure with the a replicated data? The answer is yes by using a function called *clone*.

```rust
let s1 = String::from("hello");
let s2 = s1.clone();
```

So far so good, we know how ownership works in Rust but what about functions? In order to understand this, let's look at the following example:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = takes_ownership(s1);

    println!("s1 '{}'.", s1); //not ok
    println!("s2 '{}'.", s2); //ok
} 

fn takes_ownership(st: String) -> String {
    st
}
```

Here, *s1* is passed as parameter to the *take_ownership* function. Unlike other languages where functions naturally make a copy of parameter into an local variable, Rust keeps clinging to its rules and *s1* once it is passed to *takes_ownership* function, so it stops existing within the *main()* function scope.

Now, what if we actually need to ***borrow*** ownership? Then we should pass a reference to the variable like this:

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

Here, we are passing a reference of *s1*, then s and *s1* points to the same structure. Semantics  is important here because *&s1* lets us create a reference to the value of *s1* but <u>does not own it</u>. This is a very important distinction because the actual value of *s1* will only be dropped after the real owner from the *main()* scope, stops using it. 

The `&s1` syntax lets us create a reference that *refers* to the value of `s1` but does not own it. Because it does not own it, the value it points to will not be dropped when the reference goes out of scope.

We cannot modify the String structure from within the *calculate_length()* function because we borrowed *s1*, we don´t own it.

Now, what if we need to modify the String owned by *s1* and we want to continue to let *s1* as owner of the struct in the *main()* function?

For this case we have something called ***Mutable References***. 

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

Using *mut* this way does the trick but there is only one caveat, for security reasons you can only use mutable references only once in a particular scope for a particular piece of data. 

Therefore, something like this will fail:

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{}, {}", r1, r2);
```

## Summary

Any number of immutable references or one mutable reference can exist at any time of your code. However, references must always be valid. 



***Notice***: The objective of this post was to find another way to explain how variables are handled by Rust, therefore most of the source code examples here have been borrowed from the official [Rust website](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) documentation.

