"use client";

import { generateRandomString } from "@/lib/utils";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  discriminator: string;
}

export default function OAuthCallback() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = fragment.get("access_token");
    const tokenType = fragment.get("token_type");
    const state = fragment.get("state");

    if (!accessToken) {
      // const randomString = generateRandomString();
      // localStorage.setItem("oauth-state", randomString);

      // const loginUrl = new URL(document.getElementById("login")?.innerText ?? "");
      // loginUrl.searchParams.set("state", btoa(randomString));
      // const login = document.getElementById("login");
      // if (login) {
      //   login.innerText = loginUrl.toString();
      //   login.style.display = "block";
      // }
      // return;
      setError("No access token found in the URL fragment.");
    }

    const savedState = localStorage.getItem("oauth-state");
    if (savedState !== atob(decodeURIComponent(state ?? ""))) {
      setError("You may have been click-jacked!");
      return;
    }

    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data as User))
      .catch(() => setError("Failed to fetch user info"));
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      Hello, {user.username}#{user.discriminator}
    </div>
  );
}
