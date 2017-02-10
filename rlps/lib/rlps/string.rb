# Monkey patch the Ruby's core string class
# to check whether this /proc/ directory
# represents an actual process or not which
# always displayed as an integer.
# More info: {The Linux Documentation Project}[http://tldp.org/LDP/Linux-Filesystem-Hierarchy/html/proc.html]
class String
  # Reeturns true if the string represents
  # an actual integer.
  def int?
    to_i.to_s == self
  end
end
