const axios = require("axios");

const login_url = "https://api.okra.ng/v2/mock-api/login";
const refresh_url = "https://api.okra.ng/v2/mock-api/refresh-wallet";
const logout_url = "https://api.okra.ng/v2/mock-api/logout";

async function createLogic(username, password) {
  try {
    // login useer
    const { data } = await axios.post(login_url, {
      username,
      password,
    });

    const user_data = data.data.profile;

    // refresh user's wallet
    const { data: refreshData } = await axios.post(refresh_url, {
      id: user_data.id,
    });

    const old_amount = user_data.wallet.amount;

    const new_amount = refreshData.data.wallet.amount;

    // logout user
    const { data: logoutData } = await axios.get(logout_url);

    const logout_msg = logoutData.data.msg;

    console.log([user_data.name, old_amount, new_amount, logout_msg]);
  } catch (error) {
    console.log({ error });
  }
}

createLogic("okra_user", "okra_pass");
