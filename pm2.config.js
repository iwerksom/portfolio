// pm2.config.js
// PM2 process manager config for Next.js on Nordic Way shared hosting
module.exports = {
  apps: [
    {
      name: 'jonas-portfolio',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: './',
      instances: 1,          // Nordic Way gives 2 cores — keep 1 for shared hosting
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,           // Change if Nordic Way assigns a different port
      },
      // Auto-restart on crash
      autorestart: true,
      max_restarts: 10,
      restart_delay: 3000,
      // Log files
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
