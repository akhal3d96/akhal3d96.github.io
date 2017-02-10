require 'bundler/gem_tasks'
require 'rdoc/task'

task default: :spec

RDoc::Task.new :rdoc do |rdoc|
  rdoc.main = 'README.md'
  rdoc.rdoc_files.include('README.md', 'lib/*.rb',
                          'lib/rlps/*.rb', 'lib/rlps/helper/*.rb')
  rdoc.rdoc_dir = 'doc/'
  rdoc.title = 'RLPS Documentation'
end
