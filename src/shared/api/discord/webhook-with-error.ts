import axios from "axios";
import config from "../../../config";
//TODO: 클래스형
export const webhookWithError = async (err: any) => {
  try {
    await axios({
      url: config.discord.webhookUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        embeds: [
          {
            title: `[${err.name}]`,
            color: 10038562,
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
    });
  } catch (err: any) {
    //TODO: 에러 처리
  }
};
