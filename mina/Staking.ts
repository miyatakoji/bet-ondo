import { SmartContract, state, State, method, UInt64, PublicKey } from 'snarkyjs';

class StakingContract extends SmartContract {
  @state(UInt64) totalStaked = State<UInt64>();
  @state(Map<PublicKey, UInt64>) stakedAmounts = State<Map<PublicKey, UInt64>>();
  @state(Map<PublicKey, UInt64>) rewardAmounts = State<Map<PublicKey, UInt64>>();

  init() {
    super.init();
    this.totalStaked.set(UInt64.zero);
    this.stakedAmounts.set(new Map());
    this.rewardAmounts.set(new Map());
  }

  @method
  async stake(amount: UInt64, staker: PublicKey) {
    const totalStaked = await this.totalStaked.get();
    const stakedAmounts = await this.stakedAmounts.get();

    const currentStake = stakedAmounts.get(staker) || UInt64.zero;
    const newStake = currentStake.add(amount);

    stakedAmounts.set(staker, newStake);
    this.totalStaked.set(totalStaked.add(amount));
    this.stakedAmounts.set(stakedAmounts);
  }

  @method
  async unstake(amount: UInt64, staker: PublicKey) {
    const totalStaked = await this.totalStaked.get();
    const stakedAmounts = await this.stakedAmounts.get();

    const currentStake = stakedAmounts.get(staker);
    if (currentStake == null || currentStake.lessThan(amount)) {
      throw new Error('Not enough staked');
    }

    const newStake = currentStake.sub(amount);

    stakedAmounts.set(staker, newStake);
    this.totalStaked.set(totalStaked.sub(amount));
    this.stakedAmounts.set(stakedAmounts);
  }

  @method
  async calculateRewards() {
    const stakedAmounts = await this.stakedAmounts.get();
    const rewardAmounts = new Map<PublicKey, UInt64>();

    for (const [staker, amount] of stakedAmounts.entries()) {
      const reward = this.calculateReward(amount);
      rewardAmounts.set(staker, reward);
    }

    this.rewardAmounts.set(rewardAmounts);
  }

  calculateReward(amount: UInt64): UInt64 {
    // Implement your reward calculation logic here
    // For simplicity, let's assume a fixed reward rate of 5%
    const rewardRate = UInt64.fromNumber(5);
    return amount.mul(rewardRate).div(UInt64.fromNumber(100));
  }
}

export default StakingContract;
