// Copyright 2021 Twitter, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Client, auth } from "twitter-api-sdk";

const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID as string,
  client_secret: process.env.CLIENT_SECRET as string,
  callback: "http://127.0.0.1:3000/callback",
  scopes: ["tweet.read", "users.read", "offline.access"],
});

const client = new Client(authClient);

(async () => {
  try {
    const postTweet = await client.tweets.createTweet({
      // The text of the Tweet
      text: "Are you excited for the weekend?",

      // Options for a Tweet with a poll
      poll: {
        options: ["Yes", "Maybe", "No"],
        duration_minutes: 120,
      },
    });
    console.dir(postTweet, {
      depth: null,
    });
  } catch (error) {
    console.log(error);
  }
})();