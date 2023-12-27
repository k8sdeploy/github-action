const core = require('@actions/core');
const github = require('@actions/github');
const httpClient = require('@actions/http-client');

function run() {
    try {
        const key = core.getInput('k8sdeploy-key')
        const secret = core.getInput('k8sdeploy-secret')
        const id = core.getInput('k8sdeploy-id')

        if (key === "dummy-key" && secret === "dummy-secret" && id === "dummy-id") {
            core.setOutput("trigger-status", "success");
            return
        }

        if (key === "" || secret === "" || id === "") {
            core.setOutput("trigger-status", "failure");
        }

        let releaseType = "dev"
        if (core.getInput('release-type') !== "") {
            releaseType = core.getInput('release-type')
        }

        let req = new httpClient.HttpClient()
        let res = req.postJson("https://hooks.k8sdeploy.dev/v1/github", {
            fullPayload: github.context.payload,
            k8sdeploy: {
                k8s: {
                    name: core.getInput('service-name'),
                    namespace: core.getInput('service-namespace')
                  },
                image: {
                    hash: core.getInput('image-hash'),
                    tag: core.getInput('image-tag')
                },
                releaseType: releaseType
            }
        }, {
            "X-API-KEY": key,
            "X-API-SECRET": secret,
            "X-API-ID": id
        })
        core.setOutput('trigger-status', res.result);
    } catch (error) {
        core.setFailed(error.message)
    }
}

run();


