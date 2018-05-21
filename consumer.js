const path = require("path");
const axios = require("axios");
const signale = require("signale");
const { Pact } = require("@pact-foundation/pact");
const pactNode = require("@pact-foundation/pact-node");

const providerName = "provider1";

const emptyArray = () => ({
  contents: null,
  json_class: "Pact::ArrayLike",
  min: 0
});

const pact = new Pact({
  port: 8811,
  log: path.resolve(__dirname, "logs", `pact-provider-${providerName}.log`),
  dir: path.resolve(__dirname, "pacts"),
  spec: 2,
  pactfileWriteMode: "overwrite",
  consumer: "comsumer1",
  provider: providerName
});

const interaction = {
  state: "God creates man",
  uponReceiving: "man is lonely",
  withRequest: {
    method: "GET",
    path: "/provider"
  },
  willRespondWith: {
    status: 200,
    body: emptyArray()
  }
};

const publishOpts = {
  pactFilesOrDirs: [path.join(__dirname, "pacts")],
  pactBroker: "https://test.pact.dius.com.au/",
  pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
  pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
  consumerVersion: "1.0.0"
};

const providerUrl = "http://localhost:8811/provider";
pact
  .setup()
  .then(() => pact.addInteraction(interaction))
  .then(() => axios.get(providerUrl))
  .then(() => pact.verify())
  .then(() => pact.finalize())
  .then(() => signale.success(" close pact instance"))
  .then(() => pactNode.publishPacts(publishOpts));
