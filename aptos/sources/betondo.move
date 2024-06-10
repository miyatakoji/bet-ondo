module betondo::main {
    use aptos_std::coin::Coin;

    struct BetOnDo<CoinType> has key {
        total_stakes: u64,
        predictions: vector<u64>,
    }

    public fun initialize<CoinType>(admin: &signer) {
        let betondo = BetOnDo<CoinType> {
            total_stakes: 0,
            predictions: vector::empty(),
        };
        move_to(admin, betondo);
    }

    public fun stake<CoinType>(account: &signer, amount: u64) acquires BetOnDo {
        let betondo = borrow_global_mut<BetOnDo<CoinType>>(Signer::address_of(account));
        betondo.total_stakes += amount;
        Coin::deposit(account, amount);
    }

    public fun predict_temperature<CoinType>(account: &signer, prediction: u64) acquires BetOnDo {
        let betondo = borrow_global_mut<BetOnDo<CoinType>>(Signer::address_of(account));
        vector::push_back(&mut betondo.predictions, prediction);
    }

}
