#!/usr/bin/env bash
case $1 in
start)
  echo "############################################################################"
  echo "                    We are going to start the maintenance"
  echo "############################################################################"
  cp -R ./503.html ../
  break
  ;;
stop)
  echo "############################################################################"
  echo "                    We are going to stop the maintenance"
  echo "############################################################################"
  rm -rfv ../503.html ../50x.html
  break
  ;;
-h | --help)
  echo -e '
A script to start and stop maintenance

Command line options:
    start               Start maintenance
    stop                Stop maintenance
    -h | --help         Print this help menu

'
  exit 0
  ;;
*)
  echo "Usage: $(basename $0) [-h|--help]"
  exit 0
  ;;
esac
