import React from "react";
import Layout from "../components/Layout";
import Playlists from "../components/Playlists";
import appConfig from "../config.json";
import axios from "axios";
import { useAuth } from "../lib/auth";
import { useQuery } from "react-query";

const getMyPlaylists = async (token: string) => {
  return axios
    .get(`${appConfig.SPOTIFY_API_URL}/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export default function Home() {
  const [auth, { logout }] = useAuth();

  const { data } = useQuery(
    ["me", "playlists"],
    () => getMyPlaylists(auth?.access_token),
    {
      enabled: Boolean(auth),
      onError: (err) => {
        if (err.response.status === 401) {
          logout();
        }
      },
    }
  );

  return <Layout>{data ? <Playlists playlists={data.items} /> : null}</Layout>;
}
