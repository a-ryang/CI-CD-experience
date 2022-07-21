import axios from "axios";
import config from "../../../config";

const DARK_RED = 10038562;

export const pushError = async (err: Error) => {
  if (process.env.NODE_ENV === "development") return;
  await axios({
    url: config.discord.webhookUrl,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: {
      embeds: [
        {
          title: err.name,
          color: DARK_RED,
          fields: [
            {
              name: "message",
              value: err.message,
            },
            {
              name: "datetime",
              value: new Date().toString(),
            },
          ],
          footer: {
            text: err.stack,
          },
        },
      ],
    },
  }).catch((e) => console.log(e));
};
