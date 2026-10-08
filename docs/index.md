# nodejstest

Node.js golden-path service with Jenkins, Helm, and Sonar

## Pipeline

Jenkinsfile stages: **Install → Lint → Unit tests → SonarQube → Helm lint**.

Point a Jenkins job named `demo/nodejstest` at this repo. Set credential `SONAR_TOKEN` to run the scanner against `http://sonarqube.sonarqube.svc:9000`.

## Deploy

```bash
helm upgrade --install nodejstest chart -n demo-dev
```

The chart labels pods `backstage.io/kubernetes-id=nodejstest` for Topology.

## Dev Spaces

https://devspaces.apps.rosa.rosa-89s85.bhg0.p3.openshiftapps.com#https://github.com/rmallam/nodejstest?new&devfilePath=devfile.yaml
