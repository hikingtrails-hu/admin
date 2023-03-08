### Authentication to Google Cloud:

1. Open hikingtrails runtime service account on [Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts/details/115935548081787021453/keys?project=hikingtrails-hu).
2. Generate a new key and download it as JSON.
3. Update the secret with `fly` CLI:
```sh
fly secrets set GCLOUD_RUNTIME_SERVICE_ACCOUNT=`cat ~/Downloads/hikingtrails-hu-f7ceff71e1dc.json | base64`
```
