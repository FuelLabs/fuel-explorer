#!/usr/bin/env bash

[[ $DEBUG = true ]] && set -x
set -euo pipefail

# Delete any existing minikube cluster
minikube delete

# Set disk and memory size, using defaults if not provided
DISK_SIZE=${1:-'50000mb'}
MEMORY=${2:-'12000mb'}

# Start minikube with specified resources
minikube start \
    --driver=docker \
    --disk-size="$DISK_SIZE" \
    --memory="$MEMORY" \
    --cpus 8

minikube addons enable registry
minikube addons enable registry-aliases

# Display minikube status
echo -e "\n\033[1;33mMinikube Status:\033[0m"
minikube status

cd cluster/chart && helm dependency update