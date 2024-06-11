use ink_lang as ink;
use betondo::BetOnDo;

#[cfg(test)]
mod tests {
    use super::*;
    use ink_env::test;
    use ink_env::test::DefaultAccounts;

    #[ink::test]
    fn test_stake() {
        let mut contract = BetOnDo::new();
        contract.stake(1000);
        assert_eq!(contract.total_staked, 1000);
    }

    #[ink::test]
    fn test_predict_temperature() {
        let mut contract = BetOnDo::new();
        let city = b"Tokyo".to_vec();
        let accounts = DefaultAccounts::<ink_env::DefaultEnvironment>::default();
        test::set_caller::<ink_env::DefaultEnvironment>(accounts.alice);
        contract.predict_temperature(city.clone(), 30);
        assert_eq!(contract.temperature_predictions.get(&accounts.alice), Some(&30));
    }

    #[ink::test]
    fn test_record_actual_temperature() {
        let mut contract = BetOnDo::new();
        let city = b"Tokyo".to_vec();
        contract.record_actual_temperature(city.clone(), 28);
        assert_eq!(contract.city_temperatures.get(&city), Some(&28));
    }

    #[ink::test]
    fn test_calculate_rewards() {
        let mut contract = BetOnDo::new();
        let city = b"Tokyo".to_vec();
        let accounts = DefaultAccounts::<ink_env::DefaultEnvironment>::default();
        test::set_caller::<ink_env::DefaultEnvironment>(accounts.alice);
        contract.predict_temperature(city.clone(), 30);
        contract.record_actual_temperature(city.clone(), 28);
        contract.calculate_rewards(city);
        assert_eq!(contract.reward_amounts.get(&accounts.alice), Some(&1000));
    }
}
