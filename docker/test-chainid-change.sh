#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Fuel ChainId Change Testing Script ===${NC}\n"

# Function to test chainId
test_chainid() {
    echo -e "${YELLOW}Testing chainId...${NC}"
    sleep 3

    RESULT=$(curl -s -X POST http://localhost:4000/v1/graphql \
      -H "Content-Type: application/json" \
      -d '{"query": "query { chain { consensusParameters { chainId } } }"}' \
      | jq -r '.data.chain.consensusParameters.chainId')

    echo -e "Current chainId: ${GREEN}${RESULT}${NC}"
}

# Parse command
case "$1" in
    start)
        CHAIN_ID=${2:-0}
        echo -e "${GREEN}Starting local Fuel node with chainId: ${CHAIN_ID}${NC}\n"

        TEST_CHAIN_ID=${CHAIN_ID} docker compose -f docker-compose.test.yml up -d --build

        echo -e "\n${YELLOW}Waiting for services to be healthy...${NC}"
        sleep 15

        test_chainid

        echo -e "\n${GREEN}✅ Local Fuel node is running!${NC}"
        echo -e "GraphQL endpoint: http://localhost:4000/v1/graphql"
        echo -e "L1 Chain: http://localhost:8545"
        ;;

    change)
        NEW_CHAIN_ID=${2:-1119889111}
        echo -e "${YELLOW}Changing chainId to: ${NEW_CHAIN_ID}${NC}\n"

        echo "Stopping current node..."
        docker compose -f docker-compose.test.yml down

        echo -e "\nRebuilding with new chainId..."
        TEST_CHAIN_ID=${NEW_CHAIN_ID} docker compose -f docker-compose.test.yml up -d --build

        echo -e "\n${YELLOW}Waiting for services to be healthy...${NC}"
        sleep 15

        test_chainid

        echo -e "\n${GREEN}✅ ChainId changed successfully!${NC}"
        ;;

    test)
        test_chainid
        ;;

    logs)
        docker compose -f docker-compose.test.yml logs fuel_core --tail=50
        ;;

    stop)
        echo -e "${YELLOW}Stopping local Fuel node...${NC}"
        docker compose -f docker-compose.test.yml down
        echo -e "${GREEN}✅ Stopped${NC}"
        ;;

    clean)
        echo -e "${RED}Stopping and cleaning all data...${NC}"
        docker compose -f docker-compose.test.yml down -v
        echo -e "${GREEN}✅ Cleaned${NC}"
        ;;

    *)
        echo "Usage: $0 {start|change|test|logs|stop|clean} [chainId]"
        echo ""
        echo "Commands:"
        echo "  start [chainId]   - Start local node with specified chainId (default: 0)"
        echo "  change [chainId]  - Change chainId and restart (default: 1119889111)"
        echo "  test              - Test current chainId"
        echo "  logs              - Show fuel_core logs"
        echo "  stop              - Stop local node"
        echo "  clean             - Stop and remove all data"
        echo ""
        echo "Examples:"
        echo "  $0 start 0                    # Start with chainId 0"
        echo "  $0 change 1119889111          # Change to chainId 1119889111"
        echo "  $0 test                       # Verify current chainId"
        exit 1
        ;;
esac
