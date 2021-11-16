import React from "react";
import Layout from "../components/Layout";
import Playlists from "../components/Playlists";
import appConfig from "../config.json";
import axios from "axios";
import { useAuth } from "../lib/auth";
import { useQuery } from "react-query";

const search = async (query: string, token: string) => {
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

export default function Search({ route }) {
  const [auth] = useAuth();

  const { data } = useQuery(
    "search",
    () => search(route?.params?.search, auth?.access_token),
    {
      enabled: Boolean(auth?.access_token) && Boolean(route?.params?.search),
    }
  );

  return (
    <Layout>
      {data ? <Playlists playlists={data.playlists.items} /> : null}
    </Layout>
  );
}
