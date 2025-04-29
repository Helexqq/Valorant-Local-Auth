const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const clientPlatform = 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9';
// {
// 	"platformType": "PC",
// 	"platformOS": "Windows",
// 	"platformOSVersion": "10.0.19042.1.256.64bit",
// 	"platformChipset": "Unknown"
// }

const checkProcess = async () => {
    return new Promise((resolve, reject) => {
        let processName = 'valorant.exe'
        exec(`tasklist /FI "IMAGENAME eq ${processName}"`, (error, stdout, stderr) => {
          if (error) {
            return reject(error);
          }
          
          resolve(stdout.toLowerCase().includes(processName.toLowerCase()));
        });
      }
    );
};

const readLockfile = () => {
    let lockfilePath = path.join(
process.env.LOCALAPPDATA,
'Riot Games\\Riot Client\\Config\\lockfile'
    );

    return fs.readFileSync(lockfilePath, 'utf8').split(':');
};

const getClientVersion = async () => {
    let url = 'https://valorant-api.com/v1/version';

    let requests = await fetch(url,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    let response = await requests.json();
    return response.data.branch;
};

const getTokens = async (port, password) => {
    let url = `https://127.0.0.1:${port}/entitlements/v1/token`
    
    let requests = await fetch(url, {
        headers: {
            Authorization: `Basic ${Buffer.from(`riot:${password}`).toString('base64')}`
        }
    })
    
    return await requests.json();
};

(async () =>{
    if(!await checkProcess()){
        console.log('valorant.exe is not running')
        process.exit(0)
    };

    let clientVersion = await getClientVersion();
    let [, , port, password] = readLockfile();
    let { accessToken, token }  = await getTokens(port, password);
    
    console.log({
        'X-Riot-ClientPlatform': clientPlatform,
        'X-Riot-ClientVersion': clientVersion,
        'X-Riot-Entitlements-JWT': token,
        'Authorization': `Bearer ${accessToken}`
    });
})();