---
layout: post
title:  Notes About Go (part 1)
---


This is - probably - a series of short notes about Go during my learning journey. There might be some errors and things I got wrong here and there that I maybe fix later during my learning journey or maybe I don't.


## Variables

|    |                          |
|----|--------------------------|
| := | Deceleration (first time) |
| =  | Assignment               |


**Note:** Short deceleration `:=` can assign variables too **BUT** has to declare 1 new variables at least. For example:

```go
// Correct

in, err := o.Open(file)
out, err := o.Create(file)
```


```go
// Wrong (won't compile)

in, err := o.Open(file)
in, err := o.Create(file)
```

### Scope
![Go Variables Scope Diagram](/assets/go_variables_scope.svg)

## Go Routines

1. Create a channel

    ```go
    ch := make(chan String)
    ```

2. Call a function with `go` prefixed and pass the channel variable as an argument.
    ```go
    go myFunc(ch)
    ```


3. To receive output from a channel you can do something like:

    ```go
    fmt.Println(<- ch)
    ```

4. To send things to the channel using you can do something like:

    ```go
    ch <- "String
    ```

## fmt

Printf variables referencing and octal numbers:

```go
o := 0700 // Octal numbers can be defined with `0` prefixed 
fmt.Printf("%d  %[1]o  %#[1]o", o) // 448  700  0700
```