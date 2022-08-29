---
layout: post
title:  My understanding of the OSI model
---

## Top-down

| # | Layer        | Notes                                                                                                     |
|---|--------------|-----------------------------------------------------------------------------------------------------------|
| 1 | Application  | - Something like HTTP(s)                                                                                  |
| 2 | Presentation | - The S in HTTPS                                                                                          |
| 3 | Session      | - It adds a session tag to the data<br>- It cannot read data<br>- It keeps track of state of the session  |
| 4 | Transport    | - Breaks data into segments<br>- Each segment has:<br>  - port number (src & dst) <br>  - sequence number |
| 5 | Network      | - Breaks segments into packets<br>- Attaches IP addresses to the packet (src & dst)                      |
| 6 | Data         | - Breaks packets into frames <br>- Add the MAC address of the target machine                              |
| 7 | Physical     | 010100010100010010001001                                                                                  |


## Bottom-up

1. Data in the network goes to the all the connected devices.
2. 
    1. The Data layers knows the first frame by a special sequence of bits.
    2. Based on the MAC addresses other devices reject frames
    3. Data layer removes the MAC address from the frame
3. Network layer check if the destination IP matches the current device or not
4. Transport layer check the ports
5. Session layer detects which session the data belongs to.
6. Presentation layers decrypts the data (if applicable)
7. YOUR APPLICATION