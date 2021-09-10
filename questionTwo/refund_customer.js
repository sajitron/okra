//company ID: 484929849
//customer ID: 573839293
const axios = require("axios");

const wallet_url = "https://api.okra.ng/v2/mock-api/fetch-wallet";
const pay_url = "https://api.okra.ng/v2/mock-api/pay";

async function refundCustomer(company, user, amount) {
  // fetch user's current wallet
  const { data } = await axios.post(wallet_url, {
    id: user,
  });

  const previous_wallet = data.data.wallet;

  // refund customer
  const { data: pay_data } = await axios.post(pay_url, {
    from_id: company,
    to_id: user,
    amount,
  });

  const recent_wallet = pay_data.data.wallets.to;

  console.log({
    previous_wallet,
    recent_wallet,
  });
}

refundCustomer("484929849", "573839293", 2003.0);
