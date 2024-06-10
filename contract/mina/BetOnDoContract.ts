import {
    SmartContract,
    state,
    State,
    method,
    UInt64,
    PublicKey,
    zkApp,
    Field,
    Signature,
    Poseidon,
  } from 'snarkyjs';
  
  class BetOnDoContract extends SmartContract {
    @state(UInt64) totalStaked = State<UInt64>();
    @state(Map<PublicKey, UInt64>) stakedAmounts = State<Map<PublicKey, UInt64>>();
    @state(Map<PublicKey, Field>) temperaturePredictions = State<Map<PublicKey, Field>>();
    @state(Map<PublicKey, UInt64>) rewardAmounts = State<Map<PublicKey, UInt64>>();
    @state(Map<string, UInt64>) cityTemperatures = State<Map<string, UInt64>>();
  
    init() {
      super.init();
      this.totalStaked.set(UInt64.zero);
      this.stakedAmounts.set(new Map());
      this.temperaturePredictions.set(new Map());
      this.rewardAmounts.set(new Map());
      this.cityTemperatures.set(new Map());
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
    async predictTemperature(city: string, predictedTemperature: Field, player: PublicKey, signature: Signature) {
      const temperaturePredictions = await this.temperaturePredictions.get();
  
      // Verify zkproof signature
      if (!signature.verify(player, predictedTemperature.toFields())) {
        throw new Error('Invalid zkproof');
      }
  
      temperaturePredictions.set(player, Poseidon.hash([predictedTemperature]));
      this.temperaturePredictions.set(temperaturePredictions);
    }
  
    @method
    async recordActualTemperature(city: string, actualTemperature: UInt64) {
      const cityTemperatures = await this.cityTemperatures.get();
      cityTemperatures.set(city, actualTemperature);
      this.cityTemperatures.set(cityTemperatures);
    }
  
    @method
    async calculateRewards(city: string) {
      const temperaturePredictions = await this.temperaturePredictions.get();
      const cityTemperatures = await this.cityTemperatures.get();
      const actualTemperature = cityTemperatures.get(city);
  
      if (!actualTemperature) {
        throw new Error('No actual temperature recorded for this city');
      }
  
      let closestPlayer = null;
      let closestDifference = UInt64.max();
  
      for (const [player, predictionHash] of temperaturePredictions.entries()) {
        const prediction = Poseidon.hash([predictionHash]); // This is a simplification; you would need a way to reveal the original prediction securely
        const difference = prediction.sub(actualTemperature).abs();
  
        if (difference.lessThan(closestDifference)) {
          closestDifference = difference;
          closestPlayer = player;
        }
      }
  
      if (closestPlayer) {
        const rewardAmounts = await this.rewardAmounts.get();
        const currentReward = rewardAmounts.get(closestPlayer) || UInt64.zero;
        rewardAmounts.set(closestPlayer, currentReward.add(UInt64.fromNumber(1000))); // Example reward amount
        this.rewardAmounts.set(rewardAmounts);
      }
    }
  }
  
  export default BetOnDoContract;
  