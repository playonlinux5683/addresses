module.exports = {
  apps: [
    {
      name: "iyu_addresses", // Name of the application
      script: "server.js", // Use npm to run the Next.js app
      // args: "server.js", // Run 'npm start' to serve the standalone build
      instances: 1, // Auto-scale based on the number of CPU cores
      exec_mode: "cluster", // Enable cluster mode to utilize all CPUs
      autorestart: true, // Restart if the app crashes
      watch: false, // Disable watch in production
      max_memory_restart: "1G", // Restart if memory usage exceeds 1GB
      env_production: {
        NODE_ENV: "production", // Set the environment to production
        PORT: process.env.PORT,
        PLACEKIT_API_KEY: process.env.PLACEKIT_API_KEY //"pk_ole+bOPq2agFD7gQf9LRZbHkGRIiFRZrtnaMTMMqzu8=" //process.env.PLACEKIT_API_KEY
      },
      env_development: {
        NODE_ENV: "production", // Set the environment to production
        PORT: process.env.PORT,
        PLACEKIT_API_KEY: process.env.PLACEKIT_API_KEY //"pk_ole+bOPq2agFD7gQf9LRZbHkGRIiFRZrtnaMTMMqzu8=" //process.env.PLACEKIT_API_KEY
      },
      log_file: "./logs/combined.log", // Log all outputs to combined.log
      out_file: "./logs/output.log", // Log standard output to output.log
      error_file: "./logs/error.log", // Log errors to error.log
      time: true, // Add timestamps to logs
    },
    
  ]
};