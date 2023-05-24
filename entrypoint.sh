#!/usr/bin/env bash
Green='\033[1;32m'
Orange='\033[0;33m'
Bleu='\033[1;34m'
NC='\033[0m' # No Color
echo -e "${Orange}\t\t░██████╗██╗${Bleu}███████╗░█████╗░░██████╗████████╗"
echo -e "${Orange}\t\t██╔════╝██║${Bleu}██╔════╝██╔══██╗██╔════╝╚══██╔══╝"
echo -e "${Orange}\t\t╚█████╗░██║${Bleu}█████╗░░███████║╚█████╗░░░░██║░░░"
echo -e "${Orange}\t\t░╚═══██╗██║${Bleu}██╔══╝░░██╔══██║░╚═══██╗░░░██║░░░"
echo -e "${Orange}\t\t██████╔╝██║${Bleu}██║░░░░░██║░░██║██████╔╝░░░██║░░░"
echo -e "${Orange}\t\t╚═════╝░╚═╝${Bleu}╚═╝░░░░░╚═╝░░╚═╝╚═════╝░░░░╚═╝░░░"
echo -e "${NC}"
case $1 in
create-env-dev)
	echo -e "${Green}"
	echo "############################################################################################"
	echo " We are going to create docker container for developper environment single-SPA-root-config"
	echo "############################################################################################"
	echo -e "${NC}"
	docker-compose --project-name plateforme-sifast-root-config-dev -f docker-compose.yml down
	docker-compose --project-name plateforme-sifast-root-config-dev -f docker-compose.yml up -d --build --force-recreate --renew-anon-volumes
	break
	;;
create-env-test)
	echo -e "${Green}"
	echo "############################################################################"
	echo " We are going to create a docker container for test production environment"
	echo "############################################################################"
	echo -e "${NC}"
	docker-compose --project-name plateforme-sifast-root-config-prod -f docker-compose.test.yml up -d --build --force-recreate --renew-anon-volumes
	break
	;;
start)
	echo -e "${Green}"
	echo "############################################################################"
	echo "            We are going to start dev server on docker container"
	echo "############################################################################"
	echo -e "${NC}"
	winpty docker exec -it plateforme-sifast-root-config bash
	break
	;;
start-linux)
	echo -e "${Green}"
	echo "############################################################################"
	echo "            We are going to start dev server on docker container"
	echo "############################################################################"
	echo -e "${NC}"
	docker exec -it plateforme-sifast-root-config bash
	break
	;;
-h | --help)
	echo -e '
  A script to start project container in dev environment

Command line options:
    create-env-dev       Build docker dev environment
    create-env-prod      Build docker producntion environment
    start                Start the docker node container
    start-linux          Start the docker node container on Linux Host
    -h | --help          Print this help menu

'
	exit 0
	;;
*)
	echo "Usage: $(basename $0) [-h|--help]"
	exit 0
	;;
esac
