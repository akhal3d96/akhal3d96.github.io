+++
date = '2025-11-22T16:43:31+01:00'
draft = false
title = 'Python Mutable Defaults or the Second Thing I Hate Most About Python'
+++

## Summary
- If you're working with Python `@dataclass` or Pydantic models you're usually safe. `@dataclass`  raises an excpetion when you mutate a field with defaults, and Pydantic models create deep copies of default values so never encounter that.

- Don't use default values for your annotated class attributes unless you explicitly state they are a `ClassVar` so you know what you're doing.


I have also created a demo Flake8 plugin that checks your Python code against this. I hadn't created a linter before so it was fun creating a small one and learning about it. You can check it in this repository [flake8-explicitclassvar](https://github.com/akhal3d96/flake8-explicitclassvar).


## The Problem

You might have heard about Python mutable defaults. There's a great article about them, [Python Mutable Defaults Are The Source of All Evil](https://florimond.dev/en/posts/2018/08/python-mutable-defaults-are-the-source-of-all-evil). But I'm going to explore it from a different angle.

Let's take this example:

```python
class Foo:
    # Is this a class variable or instance variable?
    x: int = 0


A = Foo()
B = Foo()

print(A.x) # 0
print(B.x) # 0

A.x = 1
B.x = 2

print(A.x) # 1
print(B.x) # 2
```

Everything looks very simple and intuitive and works as expected. However, it gets bad when the type of your class attribute is a container or a collection (`list`, `set`, etc.):


```python
class Bar:
    # Is this a class variable or instance variable?
    y: list[str] = []


A = Bar()
B = Bar()

print(A.y) # []
print(B.y) # []

A.y.append("A")
B.y.append("B")

# Expected:
print(A.y) # ["A"]
print(B.y) # ["B"]

# What you get:
print(A.y) # ["A", "B"]
print(B.y) # ["A", "B"]
```

By default Python class attributes are class variables, so when you mutate them, like what happened in `A.y.append("A")`, you mutate the class variable's default value itself; that's why you get `B.y == ["A", "B"]`. 
`A.y` and `B.y` basically point at the same object, a class variable.


You might ask yourself, but how did it work in the first example? The answer is very ~~simple~~ quirky: when you re-assign the attribute on the instance, Python stops using the class variable and creates an instance attribute instead.

So basically, to fix the previous example:


```python
class Bar:
    # Is this a class variable or instance variable?
    y: list[str]


A = Bar()
B = Bar()

A.y = []
B.y = []

A.y.append("A")
B.y.append("B")

# Expected:
print(A.y) # ["A"]
print(B.y) # ["B"]
```

It gets even uglier for class fields with default objects.

```python
class Members:
    number: int = 0

class FooBar:
    members: Members = Members()


A = FooBar()
B = FooBar()

A.members.number = 1
B.members.number = 2

# What you expect:
print(A.members.number) # 1
print(B.members.number) # 2


# What you get:
print(A.members.number) # 2
print(B.members.number) # 2

# Both A and B reference the same Members object:
print(id(A.members) == id(B.members))
```
