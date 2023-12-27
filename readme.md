# K8sDeploy Github Action

This the GitHub action to be run at the end of an image run so that k8s can direct your agent to pull the latest version
and make any other changes you need to the deployment

## Requirements
You will need to have created a set of credentials in the [dashboard](https://k8sdeploy.dev/dashboard) before using the action.

#### Release-Type

This can be different types, e.g. dev or release

the difference is
- if you send "dev", then it will always use the hash
- if you use "release", then it will use the tag if there is one or hash if not



## Configure your GitHub action
```yaml
- name: K8sDeploy
  id: k8sdeploy
  uses: k8sdeploy/github-action@v1
  with:
    service-name: "xxx" # agent
    service-namespace: "xxx" # k8sdeploy
    image-hash: ${{ github.sha }}
    image-tag: ${{ github.ref_name }}
    release-type: "dev"
    k8sdeploy-key: ${{ secrets.K8SDEPLOY_KEY }}
    k8sdeploy-secret: ${{ secrets.K8SDEPLOY_SECRET }}
    k8sdeploy-id: ${{ secrets.K8SDEPLOY_ID }}
```
