import appConfig from "../config.json";
import axios from "axios";

export const play = async (
  context_uri: string,
  token: string,
  uri?: string
) => {
  return axios
    .put(
      `${appConfig.SPOTIFY_API_URL}/me/player/play`,
      {
        context_uri,
        offset: uri
          ? {
              uri,
            }
          : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const playTopTracks = async (
  uris: string[],
  token: string,
  uri?: string
) => {
  return axios
    .put(
      `${appConfig.SPOTIFY_API_URL}/me/player/play`,
      {
        uris,
        offset: uri
          ? {
              uri,
            }
          : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};
