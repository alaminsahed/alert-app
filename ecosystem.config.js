module.exports = {
  apps: [
    {
      name: 'alert-app',
      script: 'npx',
      args: `serve -s build -p ${process.env.PORT || 3000}`,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
