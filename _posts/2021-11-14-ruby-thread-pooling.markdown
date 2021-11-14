---
layout: post
title:  Ruby Thread Pooling
---

I have been always, naively, restrain myself from using multi-threading in Ruby because, as you know *Ruby doesn't have real threads* until I read these awesome [article](https://www.speedshop.co/2020/05/11/the-ruby-gvl-and-scaling.html) by [Nate Berkopec](https://twitter.com/nateberkopec).

I was working on a web crawler, and aside from the huge (and expected) performance boost I implemented a thread pooling function that made my job easier not just for this particular usage but for almost every multi threading application, and I think it might helpful to share.

{% gist e18e03227e842d2b3349bbe4ff1afb33 thread_pool.rb %}

Feedback are always welcome.