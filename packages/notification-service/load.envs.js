const { config } = require('dotenv');
const { readFileSync } = require('node:fs');
const nodemailer = require('nodemailer');
const { resolve } = require('node:path');
const retus = require('retus');

function getVersion() {
  const packageJson = JSON.parse(
    readFileSync(resolve(__dirname, './package.json')).toString(),
  );
  return {
    version: packageJson.version,
  };
}

function getEnvName() {
  if (process.env.NODE_ENV === 'production') {
    return '.env.production';
  }
  if (process.env.NODE_ENV === 'test') {
    return '.env.test';
  }
}

function getEthFuelL1Contracts() {
  if (process.env.ETH_CHAIN === 'foundry') {
    const { body } = retus('http://localhost:8080/deployments.local.json', {
      json: true,
    });

    return body;
  }

  if (process.env.ETH_CHAIN === 'sepolia') {
    return {
      FuelChainState: '0xbe7aB12653e705642eb42EF375fd0d35Cfc45b03',
      FuelMessagePortal: '0x03f2901Db5723639978deBed3aBA66d4EA03aF73',
      FuelERC20Gateway: '0x0C817d089c693Ea435a95c52409984F45847F53c',
    };
  }
}

// Load from more specific env file to generic ->
[getEnvName(), '.env'].forEach((envFile) => {
  if (!envFile) return;
  config({
    path: resolve(__dirname, envFile),
  });
});

// Export the version to be used on database
// and application level
const versions = getVersion();
process.env.APP_VERSION = versions.version;

// Export ETH Fuel contracts addresses
const ethFuelContracts = getEthFuelL1Contracts();
if (ethFuelContracts?.FuelMessagePortal) {
  process.env.ETH_FUEL_MESSAGE_PORTAL = ethFuelContracts.FuelMessagePortal;
  process.env.ETH_FUEL_ERC20_GATEWAY = ethFuelContracts.FuelERC20Gateway;
  process.env.ETH_FUEL_CHAIN_STATE = ethFuelContracts.FuelChainState;
}

async function getMailServiceOptions() {
  if (process.env.ETH_CHAIN === 'foundry') {
    const account = await nodemailer.createTestAccount();
    const mailServiceOptions = {
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    };
    return mailServiceOptions;
  }
  return {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  };
}

getMailServiceOptions().then((mailServiceOptions) => {
  process.env.SMTP_HOST = mailServiceOptions.host;
  process.env.SMTP_PORT = mailServiceOptions.port;
  process.env.SMTP_SECURE = mailServiceOptions.secure;
  process.env.EMAIL_USER = mailServiceOptions.auth.user;
  process.env.EMAIL_PASS = mailServiceOptions.auth.pass;
});
