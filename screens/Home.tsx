import React from "react";
import Layout from "../components/Layout";
import Playlists from "../components/Playlists";
import { getMyPlaylists } from "../lib/api";
import { useAuth } from "../lib/auth";
import { useQuery } from "react-query";

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

  return (
    <Layout>
      {data ? (
        <Playlists
          playlists={[
            {
              id: "top-tracks",
              images: [
                {
                  url: "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png",
                },
              ],
              name: "Liked Songs",
              owner: {
                display_name: "You",
              },
            },
            ...data.items,
          ]}
        />
      ) : null}
    </Layout>
  );
}
