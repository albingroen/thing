import appConfig from "../config.json";
import axios from "axios";

const { SPOTIFY_API_URL } = appConfig;

export const play = async (
  context_uri: string,
  token: string,
  uri?: string
) => {
  return axios
    .put(
      `${SPOTIFY_API_URL}/me/player/play`,
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
      `${SPOTIFY_API_URL}/me/player/play`,
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

export const getMyPlaylists = async (token: string) => {
  return axios
    .get(`${SPOTIFY_API_URL}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getLikedTracks = async (token: string) => {
  return axios
    .get(`${SPOTIFY_API_URL}/me/tracks?limit=50`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getPlaylist = async (id: string, token: string) => {
  return axios
    .get(`${SPOTIFY_API_URL}/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getIsUserFollowingPlaylist = async (id: string, token: string) => {
  return axios
    .get(
      `${SPOTIFY_API_URL}/playlists/${id}/followers/contains?ids=abbecooling123`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const followPlaylist = async (id: string, token: string) => {
  return axios
    .put(`${SPOTIFY_API_URL}/playlists/${id}/followers`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const unfollowPlaylist = async (id: string, token: string) => {
  return axios
    .delete(`${SPOTIFY_API_URL}/playlists/${id}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getPlayer = async (token: string) => {
  return axios
    .get(`${appConfig.SPOTIFY_API_URL}/me/player`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const pause = async (token: string) => {
  return axios
    .put(`${appConfig.SPOTIFY_API_URL}/me/player/pause`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const resume = async (token: string) => {
  return axios
    .put(`${appConfig.SPOTIFY_API_URL}/me/player/play`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const next = async (token: string) => {
  return axios
    .post(`${appConfig.SPOTIFY_API_URL}/me/player/next`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const previous = async (token: string) => {
  return axios
    .post(`${appConfig.SPOTIFY_API_URL}/me/player/previous`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const search = async (query: string, token: string) => {
  return axios
    .get(
      `${appConfig.SPOTIFY_API_URL}/search?q=${query}&type=playlist&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};
