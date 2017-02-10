require 'rlps'
RSpec.describe RLPS::Process do
  let(:process) do
    RLPS::Process.new name: 'systemd', pid: 1
  end
  it 'Should accept only two or zero arguments :name and :pid' do
    expect(process.pid).to eq(1)
  end
  it 'Should look up this process in the processes tree and the return true ' do
    expect(process.still_running?).to be_truthy
  end
end
