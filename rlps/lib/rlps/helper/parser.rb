require 'rlps/string'
require 'rlps/process'

module RLPS

  # This class parses Linux's /proc/ directory status file.
  class Parser
    # This method gets a /proc/ directory, then it parses
    # its status file and returns a new RLPS::Process object.
    def self.process_from_dir(dir)
      status = {}
      File.open(File.join(File.join('/proc', dir), 'status'), 'r') do |f|
        f.each_line do |line|
          res = line.match(/(^\w+):\s*(\d+|[\w\(\)\-]+)?/).captures
          res[1] ||= nil
          status[res[0]] = res[1]
        end
      end
      RLPS::Process.new name: status['Name'], pid: status['Pid'].to_i
    end
  end
end
