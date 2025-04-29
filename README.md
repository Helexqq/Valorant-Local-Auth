# Valorant-Local-Auth
*Script for generating X-Riot tokens for the unofficial Valorant API*

---

## Usage

```bash
node index.js
```

## Output

Outputs a JSON object with the following authentication headers:

| Header                    | Description                                      |
| ------------------------- | ------------------------------------------------ |
| `X-Riot-ClientPlatform`   | Base64-encoded platform information.             |
| `X-Riot-ClientVersion`    | The version of the Valorant client.       |
| `X-Riot-Entitlements-JWT` | JWT token.                 |
| `Authorization`           | `Bearer <access token>`.                         |


## Example
```bash
{
  "X-Riot-ClientPlatform":   "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9",
  "X-Riot-ClientVersion":    "release-10.07",
  "X-Riot-Entitlements-JWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…",
  "Authorization":           "Bearer eyJhbGciOiJIUzI1NiJ…"
}
```
