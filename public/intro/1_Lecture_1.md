# Lecture 1

[Integer Division and Modulo](#integer-division-and-modulo)

[Binary Representation](#binary-representation)

[Binary Representation of Negative Numbers](#binary-representation-of-negative-numbers)

## Integer Division and Modulo

The types *int* and *unsigned int* can only represent integers. Divisions are back like in primary school, you can just remove the values after the comma.

~~~cpp
int a = 10 / 3; // a = 3; "a=3.333" -> remove the after comma values -> a = 3
~~~

For modulo, think it as the rest of the division:

~~~cpp
int a = 10%3 // a = 1; 10 divided by 3 equals 3 rest 1 <=> 10%3 = 1
~~~

You can always go back to the original value, with this fundamental principle:

~~~cpp
int b = ...
int a = a/b * b + a%b
~~~

## Binary Representation

The binary representation of a decimal number is made out of *bits*, which can be either zeros or ones. One *byte* is 8 bits. Each bit represent a power of two with the most left bit being the highest power.

$$$
5 = 4*1 + 2*0 + 1*1 \\
5 = 101_{2}
$$$

## Binary Representation of Negative Numbers

### 2's complement theory

When thinking about how computers should represent negative numbers, this principle was decided as fundamental
$$$
x + -x = 0
$$$

Thus, we arrive at the *2's complement* representation. When the most left bit is 1 then the number is negative, and we *add up* from the smallest number we can represent the power of twos of the next bits. For example, $1000$ is $-8$ in a 4 bits representation of numbers using the 2's complement principle. Then $1001$ is $-7$, as we add $1$ to $-8$. $1010$ is $-6$ as we add $2$ to $-8$, etc.
$1111$ would then be $-1$. It verifies the 2's complement principle as when you add $0001$ (1 in decimal) to it, you get $0000$.

Note: When there is an "overflow", the counter gets back to 0. Explicitly, if you add $0001$ to $1111$ in a 4 bits system, you go back to $0000$.

### Quickly find 2's complement representation of a negative number

<ol style="list-style-type: decimal">
<li>Convert the absolute value of x to binary.</li>
<li>Flip bits.</li>
<li>Add 1.</li>
</ol>
