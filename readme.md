# K8sDeploy Github Action

This the github action to be run at the end of an image run so that k8s can direct your agent to pull the latest version
and make any other changes you need to the deployment

## Requirements
You will need to have created a set of credentials in the [dashboard](https://k8sdeploy.dev/dashboard) before using the action,  
this can only be done after deploying the agent in your cluster

## Configure your Github action
```yaml
- name: K8sDeploy
  id: k8sdeploy
  uses: k8sdeploy/github-action@v1
  with:
    service-name: "xxx" # agent
    service-namespace: "xxx" # k8sdeploy
    image-hash: ${{ github.sha }}
    image-tag: ${{ github.ref_name }}
    k8sdeploy-key: ${{ secrets.K8SDEPLOY_KEY }}
    k8sdeploy-secret: ${{ secrets.K8SDEPLOY_SECRET }}
```
