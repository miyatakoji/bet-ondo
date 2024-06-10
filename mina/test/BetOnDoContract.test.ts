import { isReady, shutdown, Mina, PrivateKey, PublicKey, UInt64, Field, Poseidon, Signature } from 'snarkyjs';
import BetOnDoContract from '../contracts/BetOnDoContract';

describe('BetOnDoContract', () => {
  let deployerAccount: { privateKey: PrivateKey, publicKey: PublicKey };
  let playerAccount: { privateKey: PrivateKey, publicKey: PublicKey };
  let betOnDoContract: BetOnDoContract;

  beforeAll(async () => {
    await isReady;
    const Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);

    deployerAccount = Local.testAccounts[0];
    playerAccount = Local.testAccounts[1];

    betOnDoContract = new BetOnDoContract(deployerAccount.publicKey);
  });

  afterAll(() => {
    setTimeout(shutdown, 0);
  });

  it('should initialize contract', async () => {
    const txn = await Mina.transaction(deployerAccount.privateKey, () => {
      betOnDoContract.init();
    });
    await txn.send().wait();
    const totalStaked = await betOnDoContract.totalStaked.get();
    expect(totalStaked).toEqual(UInt64.zero);
  });

  it('should stake tokens', async () => {
    const stakeAmount = UInt64.fromNumber(1000);
    const txn = await Mina.transaction(playerAccount.privateKey, () => {
      betOnDoContract.stake(stakeAmount, playerAccount.publicKey);
    });
    await txn.send().wait();
    const stakedAmounts = await betOnDoContract.stakedAmounts.get();
    expect(stakedAmounts.get(playerAccount.publicKey)).toEqual(stakeAmount);
  });

  it('should predict temperature with zkproof', async () => {
    const city = 'Tokyo';
    const predictedTemperature = Field(30); // Example prediction
    const signature = Signature.create(playerAccount.privateKey, predictedTemperature.toFields());

    const txn = await Mina.transaction(playerAccount.privateKey, () => {
      betOnDoContract.predictTemperature(city, predictedTemperature, playerAccount.publicKey, signature);
    });
    await txn.send().wait();

    const temperaturePredictions = await betOnDoContract.temperaturePredictions.get();
    const hashedPrediction = Poseidon.hash([predictedTemperature]);
    expect(temperaturePredictions.get(playerAccount.publicKey)).toEqual(hashedPrediction);
  });

  it('should record actual temperature', async () => {
    const city = 'Tokyo';
    const actualTemperature = UInt64.fromNumber(28); // Example actual temperature

    const txn = await Mina.transaction(deployerAccount.privateKey, () => {
      betOnDoContract.recordActualTemperature(city, actualTemperature);
    });
    await txn.send().wait();

    const cityTemperatures = await betOnDoContract.cityTemperatures.get();
    expect(cityTemperatures.get(city)).toEqual(actualTemperature);
  });

  it('should calculate rewards', async () => {
    const city = 'Tokyo';

    const txn = await Mina.transaction(deployerAccount.privateKey, () => {
      betOnDoContract.calculateRewards(city);
    });
    await txn.send().wait();

    const rewardAmounts = await betOnDoContract.rewardAmounts.get();
    const reward = rewardAmounts.get(playerAccount.publicKey);
    expect(reward).toEqual(UInt64.fromNumber(1000)); // Example reward amount
  });
});
