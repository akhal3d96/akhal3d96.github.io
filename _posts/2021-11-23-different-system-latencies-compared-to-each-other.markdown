---
layout: post
title:  Different system latencies compared to each other
---

| Event                                     | Latency   | Scaled        |
|-------------------------------------------|-----------|---------------|
| 1 CPU cycle                               | 0.3 ns    | 1 s           |
| Level 1 cache access                      | 0.9 ns    | 3 s           |
|  Level 2 cache access                     | 3 ns      | 10 s          |
| Level 3 cache access                      | 10 ns     | 33 s          |
| Main memory access (DRAM, form CPU)       | 100 ns    | 6 min         |
| Solid-state disk I/O (flash memory)       | 10-100 µs | 9–90 hours    |
| Rotational disk IlO                       | 1–10 ms   | 1–12 months   |
| Internet: San Francisco to New York       | 40 ms     | 4 years       |
| Internet: San Francisco to United Kingdom | 81 ms     | 8 years       |
| Lightweight hardware virtualization boot  | 100 ms    | 11 years      |
| Internet: San Francisco to Australia      | 182 ms    | 19 years      |
| OS virtualization system boot             | < 1 s     | 105 years     |
| TCP timer-based retransmit                | 1–3 s     | 105–317 years |
| SCSI command time-out                     | 30 s      | 3 millennia   |
| Hardware (HW) virtualization system boot  | 40 s      | 4 millennia   |
| Physical system reboot                    | 5 m       | 32 millennia