# RLPS

**RLPS** is a very simple and pure Ruby gem which sole prupose is to get a **list** of the currently **running processes** in a **Linux** system by reading data from Linux /proc/ directory.
More information read The Linux Documentation Project [topic](http://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/proc.html) on this subject.
## Installation

Add this line to your application's Gemfile:

```ruby
gem 'rlps'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install rlps

## Documentation
See https://nemoload.github.io/rlps/
## Usage
``` ruby
require 'rlps'

my_processes = RLPS.processes

p my_processes[0]       # => systemd: 1
p my_processes[0].name  # => systemd
p my_processes[0].pid   # => 1
```
Returns a list of [RLPS::Process](http://www.github.com/nemoload) objects.
## CLI
**TL;DR: Don't.** 
Although this gem wasn't made to be used as a CLI application, it can act as a very bad, ineffecient version of Linux ``` $ ps -e ```:
          
    $ rlps

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/nemoload/rlps.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

