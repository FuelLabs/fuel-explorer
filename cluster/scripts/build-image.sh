#!/usr/bin/env bash 

# Default values
IMAGE_NAME="fuel-explorer"
DOCKERFILE="deployment/Dockerfile"
TAG=${EXPECTED_TAG:-"local"} # From environment variable with default

# Parse named arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --image-name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        --dockerfile)
            DOCKERFILE="$2"
            shift 2
            ;;
        --tag)
            TAG="$2"
            shift 2
            ;;
        *)
            echo "Error: Unknown argument '$1'"
            usage
            ;;
    esac
done

echo "Using docker host: $DOCKER_HOST"
eval $(minikube docker-env)
docker build -t "${IMAGE_NAME}:${TAG}" -f "${DOCKERFILE}" .
