#!/usr/bin/env bash

# Need all remote branches
git fetch --no-tags

request_body=$(jq -c -r -n --arg title "Deploy Version $VERSION" '{title: $title, merge_when_pipeline_succeeds: true, auto_merge_strategy: "merge_when_pipeline_succeeds"}')

created_merge_request_response=$(curl -X POST --header "PRIVATE-TOKEN: ${GITLAB_PRIVATE_TOKEN}" --header "Content-Type:application/json" -d "${request_body}" "https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/merge_requests?source_branch=pre-production&target_branch=production&labels=Deployment")

# Automatically Merge MR
merge_request_id=$(echo $created_merge_request_response | tr '\r\n' ' ' | jq '.iid')

# Function to delay
delay() {
  sleep "$1"
}

desired_status="can_be_merged"
retry_times=5
attempt=1

# Check for correct merge request status before setting `merge_when_pipeline_succeeds` to `true`.
while [ $attempt -le $retry_times ]; do
    # Get status of the merge request
    response=$(curl -X GET --header "PRIVATE-TOKEN: ${GITLAB_PRIVATE_TOKEN}" "https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${merge_request_id}")

    # Extract merge_status and pipeline from the response
    merge_status=$(echo "$response" | jq -r '.merge_status')
    pipeline=$(echo "$response" | jq -r '.pipeline')

    # Only continue if the merge request can be merged and has a pipeline.
    if [[ "$merge_status" == "$desired_status" && "$pipeline" != "null" ]]; then
        break
    fi

    delay $((500 * attempt / 1000))
    attempt=$((attempt + 1))
done

auto_merge_request_response=$(curl -X PUT --header "PRIVATE-TOKEN: ${GITLAB_PRIVATE_TOKEN}" "https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/merge_requests/${merge_request_id}/merge?merge_when_pipeline_succeeds=true")

merge_request_url=$(echo $created_merge_request_response | tr '\r\n' ' ' | jq '.web_url' | tr -d '"')

echo "Created MR link: ${merge_request_url}"