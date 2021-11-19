import React from "react";
import Layout from "../components/Layout";
import Playlists from "../components/Playlists";
import { useAuth } from "../lib/auth";
import { useQuery } from "react-query";
import { search } from "../lib/api";

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
