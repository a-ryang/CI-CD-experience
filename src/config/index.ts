import "dotenv/config";

const isValid = (key: string, defaultValue: any = undefined) => {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`invalid environment variable : ${key}`);
  }
  return value;
};

export default {
  port: isValid("PORT", 8080),
  sentry: {
    dsn: isValid("SENTRY_DSN"),
  },
  discord: {
    webhookUrl: isValid("DISCORD_WEBHOOK_URL"),
  },
};
