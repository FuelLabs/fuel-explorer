// fetchAccounts.ts
import { AccountDAO } from '../../infra/dao/AccountDAO';

async function fetchAccounts() {
  const accountDAO = new AccountDAO();

  try {
    const accounts = await accountDAO.getAccounts();

    if (accounts) {
      console.log('Fetched accounts:', accounts);
    } else {
      console.log('No accounts found in the database.');
    }
  } catch (error) {
    console.error('Error fetching accounts:', error);
  }
}

fetchAccounts()
  .catch(console.error)
  .finally(() => process.exit());
