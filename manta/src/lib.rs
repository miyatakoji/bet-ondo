use ink_lang as ink;

#[ink::contract]
mod betondo {
    use ink_storage::collections::HashMap as StorageHashMap;
    use ink_prelude::vec::Vec;

    #[ink(storage)]
    pub struct BetOnDo {
        total_staked: Balance,
        staked_amounts: StorageHashMap<AccountId, Balance>,
        temperature_predictions: StorageHashMap<AccountId, u32>,
        reward_amounts: StorageHashMap<AccountId, Balance>,
        city_temperatures: StorageHashMap<Vec<u8>, u32>,
    }

    #[ink(event)]
    pub struct Predicted {
        #[ink(topic)]
        player: AccountId,
        #[ink(topic)]
        city: Vec<u8>,
        temperature: u32,
    }

    #[ink(event)]
    pub struct RewardCalculated {
        #[ink(topic)]
        player: AccountId,
        reward: Balance,
    }

    impl BetOnDo {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                total_staked: 0,
                staked_amounts: StorageHashMap::new(),
                temperature_predictions: StorageHashMap::new(),
                reward_amounts: StorageHashMap::new(),
                city_temperatures: StorageHashMap::new(),
            }
        }

        #[ink(message)]
        pub fn stake(&mut self, amount: Balance) {
            let caller = self.env().caller();
            let staked_amount = self.staked_amounts.entry(caller).or_insert(0);
            *staked_amount += amount;
            self.total_staked += amount;
        }

        #[ink(message)]
        pub fn predict_temperature(&mut self, city: Vec<u8>, temperature: u32) {
            let caller = self.env().caller();
            self.temperature_predictions.insert(caller, temperature);
            self.env().emit_event(Predicted {
                player: caller,
                city: city.clone(),
                temperature,
            });
        }

        #[ink(message)]
        pub fn record_actual_temperature(&mut self, city: Vec<u8>, temperature: u32) {
            self.city_temperatures.insert(city, temperature);
        }

        #[ink(message)]
        pub fn calculate_rewards(&mut self, city: Vec<u8>) {
            let actual_temperature = self.city_temperatures.get(&city).copied().unwrap_or(0);
            let mut closest_player = None;
            let mut closest_difference = u32::MAX;

            for (player, &predicted_temperature) in self.temperature_predictions.iter() {
                let difference = (predicted_temperature as i32 - actual_temperature as i32).abs() as u32;
                if difference < closest_difference {
                    closest_difference = difference;
                    closest_player = Some(player);
                }
            }

            if let Some(player) = closest_player {
                let reward = 1000;
                let player_reward = self.reward_amounts.entry(*player).or_insert(0);
                *player_reward += reward;
                self.env().emit_event(RewardCalculated {
                    player: *player,
                    reward: reward,
                });
            }
        }
    }
}
