import React from "react";
import Layout from "../components/Layout";
import Playlists from "../components/Playlists";

export default function Search({ route }) {
  return <Layout>{route?.params?.search ? <Playlists /> : null}</Layout>;
}
