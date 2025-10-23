#!/usr/bin/env python
load('ext://restart_process', 'docker_build_with_restart')
load('ext://color', 'color')
load('ext://dotenv', 'dotenv')

analytics_settings(True) # Enable telemetry dialogue in web UI
disable_snapshots()      # Disable TiltCloud Snapshots
version_settings(True)   # Enable 'new version' banner

# Load environment variables from .env file
dotenv()

# Allow users to run `tilt up --stream` for better log handling
allow_k8s_contexts('minikube')

# Build the Docker image
custom_build(
    ref='fuel-explorer:local',
    command=[
        './cluster/scripts/build-image.sh',
        '--image-name', 'fuel-explorer',
        '--dockerfile', './deployment/Dockerfile',
    ],
    deps=[
        'deployment/Dockerfile',
        'packages',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml'
    ],
    live_update=[
        sync('packages', '/app'),
        sync('pnpm-lock.yaml', '/app/pnpm-lock.yaml'),
        sync('pnpm-workspace.yaml', '/app/pnpm-workspace.yaml'),
        run('pnpm install --frozen-lockfile', trigger=['pnpm-lock.yaml']),
        run('pnpm build:lib', trigger=['packages']),
    ],
    ignore=['node_modules']
)

# Create namespace
k8s_yaml(blob("""
apiVersion: v1
kind: Namespace
metadata:
  name: fuel-explorer
"""))

# Deploy Helm chart
k8s_yaml(helm(
    'cluster/chart',
    values=['cluster/chart/values.yaml'],
    name='fuel-explorer-local',
    namespace='fuel-explorer'
))

# Port forwards for services
k8s_resource(
    'fuel-explorer-local-api',
    port_forwards=['3000:3000']
)

k8s_resource(
    'fuel-explorer-local-syncer',
    port_forwards=['3001:3001']
)

# Resource grouping for better UI organization
k8s_resource(
    'fuel-explorer-local-postgresql',
    new_name='postgresql',
    port_forwards=['5432:5432']
)

k8s_resource(
    'fuel-explorer-local-rabbitmq',
    new_name='rabbitmq',
    port_forwards=['5672:5672']
)
