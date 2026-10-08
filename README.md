# nodejstest

Node.js golden-path service with Jenkins, Helm, and Sonar

| Piece | Path |
|---|---|
| App | `server.js` (`GET /health`) |
| Tests | `npm test` / `npm run lint` |
| Sonar | `sonar-project.properties` |
| CI | `Jenkinsfile` |
| Deploy | `chart/` (Helm) |
| IDE | `devfile.yaml` |

```bash
npm install
npm run lint
npm test
helm lint chart
```
