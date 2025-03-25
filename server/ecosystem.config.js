module.exports = {
  apps: [
    {
      name: "runmate",
      script: "runmate",
      env: {
        NODE_ENV: "production",
        PORT: 3000, // Ensure this matches your .env
      },
    },
  ],
};
