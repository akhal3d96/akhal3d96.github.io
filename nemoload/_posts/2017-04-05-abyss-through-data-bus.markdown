---
layout: post
date:   2017-04-05 00:52:55 +0200
categories: diaries
---
```python
#!/usr/bin/env python
impo urllib2
import threading
import os

#pygame.init()

def SearchForChange():
	threading.Timer(2.0, SearchForChange).start()
	Text = urllib2.urlopen('http://www.nemowebwork.t15.org/a.txt')
	
	if Text.readline() != "":
		
		os.system("shutdown -h now")
		
		"""if Text.readline() == "":
		print Text.readline()
		pygame.mixer.music.load("Downloads/d.mp3")
		pygame.mixer.music.play()
		pygame.event.wait()
		pygame.mixer.music.rewind"""
SearchForChange()	
