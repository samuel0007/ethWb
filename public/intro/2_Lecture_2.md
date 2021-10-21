# Lecture 2

[Expressions](#expressions)

[Loops](#loops)

[Debugging](#debugging)

## Expressions

Expressions are sequences of _operators_ and _operands_ that represent a computation, they can be subdivided into _primary_ expressions and _composed_ expressions. Every _composed_ expressions is made by combining primary _expressions_ through _operations_. They are the building blocks of every C++ Program, and it's very important that you grasp well how they work to go further in the lecture.

Every expression has a *type* and a *value*. The type is fixed at compile time (int, ...), but the value and the side effects only materialize when the expression gets evaluated. Evaluating an expression is the most frequent activity going on while a C++ program is executed; the evaluation computes the value of the expression and carries out its effect (if any).

### Lvalues and Rvalues

An lvalue is an expression that has an address. The value of an lvalue is defined as the value of the object at its address (try to output the expression (b = 5)). We say that a lvalue _refers_ to the object at its address.

Every expression that is not an lvalue is an rvalue. For example, literals are rvalues: there is no address associated with the int-literal 0. In reality (by C++ standards about [value category](https://en.cppreference.com/w/cpp/language/value_category)), it's slightly more complicated, but we won't go so deep for this lecture.

### Precedence and associativity

_Precedence_ and _associativity_ are the two rules that dictate the **order** in which the operators are **evaluated** inside of a composite expression.  
**Precedence** specifies which operator gets evaluated **first** between **_different_ operators** (the lowest the number the earlier), while **associativity** specifies which operator goes **first** between operators that have the **same precedence**.

As a **rule of thumb** for precedence, arithmetic operators (e.g. +) bind **stronger** than relational operators (e.g. <); who in turn bind **stronger** than binary logical operators (e.g. &&).

Of course, you can always use **parenthesis** to specify your own order of evaluation.

Here's a list with the most common operators and their precedence and associativity:

| Precedence | Operator                 | Associativity |
|------------|--------------------------|---------------|
| 2          | a++, a--, a[], a()       | Left-to-right |
| 3          | ++a, --a, +a, -a, *a, &a | Right-to-left |
| 5          | a*b, a/b, a%b            | Left-to-right |
| 6          | a+b, a-b                 | Left-to-right |
| 9          | <, <=, >, >=             | Left-to-right |
| 10         | ==, !=                   | Left-to-right |
| 14         | &&                       | Left-to-right |
| 15         | \|\|                     | Left-to-right |
| 16         | =                        | Right-to-left |

### Short-Circuting

When evaluating expressions, the compiler follows another special rule called Short Circuit evaluation for the operators && and ||. For these operators the compiler guarantees to always evaluate the left expression first. If the overall result can be inferred from the left expression alone, then the right expression is not evaluated, thus saving useless computation.

## Loops

Loops are the way to express iteration - executing a statement many times - in the flow of the program. It helps you to avoid having to copy-pasting the same line of code ten times !

### While loops

The syntax is close to the one of the if statement, the only difference is that the statement is repeated until the condition becomes false.

~~~cpp
if(condition) { // 1: check if condition is true, if yes execute the statements inside the curly brackets
    statement; // 2: statement(s)
}

while(condition) { // 1: check if condition is true, if yes execute the statements inside the curly brackets
    statement; // 2: statements, are executed until the condition becomes false. 
}
// the order of execution is always: 1 -> 2 -> 1 -> 2 -> ...
~~~

### For loops

For loops are simply syntactic sugar (the compiled code at the end is the same) to express specific kinds of while loops:

~~~cpp
unsigned int i = 0; // 1. initialization
while(i < 100) { // 2. condition
    statements; // 3. statements
    ++i; // 4. incrementation
}

// Exactly the same but as a "for loop" !
for(unsigned int i = 0; i < 100; ++i) {
    statements;
}
~~~

## Debugging

Debugging is an important part of programming, this section will introduce you to some important tools that you can use while trying to find the bugs in your program.

### Asserts

We can use assert statements to check our assumptions in various places. When an assert statement fails, we get a precise location information. Asserts are generally only use during the development phase, and below you find an example on how to desactivate them with a macro for your production code. To use assert statements, you have to include the _assert.h_ library.

~~~cpp
#include <assert.h>     // assert library
// #define NDEBUG /* include this line if you want to remove all your asserts from your production code */

int a = 3;
int b = 4;
assert(a < b);
~~~

### Tracing

Program tracing is the process of executing program code by hand, with concrete inputs. The basics of it are resumed in the following table, please follow [this guide](https://lec.inf.ethz.ch/ifmp/2021/guides/tracing/basic.html) for a more detailed procedure.

| Variable | Value |
|----------|-------|
| a        | ~~5~~, 8 |
| b | ~~3~~, 4 |

### std::cout

This is your most fundamental tool for debugging, you can always use the standard output as a way to know what is the actual state of a variable.

~~~cpp
int x = 5;
int y = 4;
int z = x / y;
// Can't remember how integer division works ? Easy, just output the variable !
std::cout << "State of var z: " << z << "\n";
~~~
