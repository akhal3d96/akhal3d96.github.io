require 'rlps/version'
require 'rlps/process'
require 'rlps/string'
require 'rlps/helper/parser'

module RLPS
  class << self
    attr_accessor :processes
  end

  module_function

  # Get the currently runing processes as a list.
  def processes
    @processes ||= parse_processes
  end

  # Update the already fetched processes list.
  def update!
    @process = parse_processes
  end

  private

  def self.parse_processes
    processes_arr = []
    Dir.entries('/proc/').each do |dir|
      processes_arr << RLPS::Parser.process_from_dir(dir) if dir.int?
    end
    processes_arr
  end
end
