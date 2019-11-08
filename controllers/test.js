var stream = require('getstream');
const StreamChat = require('stream-chat').StreamChat;
// Instantiate a new client (server side)
client = stream.connect('s33yts2cwvkw', 'cxpte6cc8jr5xv3y6sx7bjchx98d5k4rq7rf7kzz65zqym52azjrcefy93v3dbmc', '63439');
// Instantiate a new client (client side)
//client = stream.connect('s33yts2cwvkw', null, '63439');

const chatClient = new StreamChat('s33yts2cwvkw', {
    timeout: 3000,
    httpAgent: new http.Agent({ keepAlive: 3000 }),
    httpsAgent: new http.Agent({ keepAlive: 3000 }),
});

// Current user
const client = new StreamChat('no-se-que-va-aca');
await chatClient.setUser(
    {
        id: 'inakusito',
        name: 'Iñaki',
        image: 'https://getstream.io/random_svg/?name=John',
    },
    token,
);
return client;

//Channel
const channel = client.channel('messaging', 'the-small-council_qIamj0j_h', {
    name: "DOMUM",
    image: "https://bit.ly/2F3KEoM",
    members: ["inakusito"],
    session: 8 // custom field, you can add as many as you want
  });
  await channel.watch();
  return channel;

const serverSideClient = new StreamChat('s33yts2cwvkw', 'cxpte6cc8jr5xv3y6sx7bjchx98d5k4rq7rf7kzz65zqym52azjrcefy93v3dbmc');
const token = serverSideClient.createToken('inakusito');

await client.setGuestUser({ id: 'simple-user' });