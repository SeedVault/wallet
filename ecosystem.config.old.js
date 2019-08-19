module.exports = {
  apps : [{
    name: 'wallet',
    script: 'npm',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'run serve',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      WALLET_PORT: '9001'
    },
    env_production: {
      NODE_ENV: 'production',
      WALLET_PORT: '9001'
    }
  }],

  deploy : {
  }
};
