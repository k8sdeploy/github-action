const core = require('@actions/core');
const github = require('@actions/github');
const httpClient = require('@actions/http-client');

async function run() {
    try {
        let req = new httpClient.HttpClient()
        let res = req.postJson("https://hooks.k8sdeploy.dev/v1/github", {
            fullPayload: JSON.stringify(github.context.payload, undefined, 2),
            serviceName: core.getInput('service-name'),
            serviceNamespace: core.getInput('service-namespace'),
            imageHash: core.getInput('image-hash'),
            imageTag: core.getInput('image-tag')
        }, {
            "X-API-KEY": core.getInput('k8sdeploy-key'),
            "X-API-SECRET": core.getInput('k8sdeploy-secret')
        })
        core.setOutput('trigger-status', res.result);
    } catch (error) {
        core.setFailed(error.message)
    }
}

run()