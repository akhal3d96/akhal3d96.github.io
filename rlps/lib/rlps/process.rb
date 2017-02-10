module RLPS
  ##
  # Represents a process
  ##
  class Process
    attr_reader :name, :pid
    # Takes two arguments _:name_ and _:pid_
    # If called without any arguments it calls RLPS::Process.this_process.
    # ==== Examples
    # RLPS::Process.new name: "ruby", pid: 2365
    def initialize(**args)
      #-- other = args.select { |k, _v| ((k == :name) &&
      # !args[k].nil?) || ((k == :pid) && !args[k].nil?) }
      # raise if (other.count == 0) || (args.count != 2)
      # TODO check if this process actually exists
      @name = args[:name] || this_process.name
      @pid = args[:pid] || this_process.pid
    end

    def to_s
      "#{@name}: #{@pid}"
    end

    def to_i
      @pid
    end

    # Returns true if the process is still running.
    def still_running?
      !RLPS.processes.select do |p|
        p.pid == @pid &&
          p.name.casecmp(@name.downcase).zero?
      end.empty?
    end

    # Send INT signal to the process as a default behaviour.
    # It accepts any signal Kernel#Process takes.
    # More info: Kernel[https://ruby-doc.org/core/Kernel.html]
    def kill!(signal = 'INT')
      ::Process.kill(signal, @pid)
    end

    # Return this process RLPS::Process object.
    def self.this_process
      process = RLPS.processes.select { |p| p.pid == ::Process.pid }
      RLPS::Process.new name: process[0].name, pid: ::Process.pid
    end

    def self.get(name: nil, pid: nil) #:nodoc:
      # TODO
    end
    alias inspect to_s
  end
end
