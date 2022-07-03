exports.listId = {USDC:"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
BTC:"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
WETH:"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
LINK: "0x514910771af9ca656af840dff83e8264ecf986ca",
UNI: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
AAVE: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
MATIC: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0",
GRT: "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
COMP: "0xc00e94cb662c3520282e6f5717214004a7f26888",
SUSHI: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
YFI: "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
AMPL: "0xd46ba6d942050d489dbd938a2c909a5d5039a161",
SUPER: "0xe53ec727dbdeb9e2d5456c3be40cff031ab40a55",
SHIB: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce"
}

exports.uniswapQuery = `
{
  uniswapDayDatas(orderBy: date, orderDirection:desc, first: 30) {
    date
    dailyVolumeUSD
    
    txCount
  }

}
`;

