const express = require("express");
const signale = require("signale");
const { Verifier } = require("@pact-foundation/pact");

const server = express();

server.get("/provider", (req, res) => {
  res.json([1]);
});

server.listen(8082);

const opts = {
  provider: "provider1",
  providerBaseUrl: "http://localhost:8082",
  pactBrokerUrl: "https://test.pact.dius.com.au/",
  pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
  pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
  publishVerificationResult: true,
  providerVersion: "1.0.0"
};

const verifier = new Verifier();
verifier.verifyProvider(opts).then(output => {
  signale.success("Pact Verification Complete!");
  signale.success(output);
});
