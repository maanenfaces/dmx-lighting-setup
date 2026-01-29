# Default Shell to use
SHELL := /bin/bash

# Absolute path of the directory of this script
root_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: help cleanup start stop

help:
	@echo -e "\nMakefile commands:"
	@echo "  cleanup   - Remove orphan images"
	@echo "  start     - Start docker-compose in foreground"
	@echo -e "  stop      - Stop docker-compose\n"

cleanup:
	cd $(root_dir) && docker-compose down --rmi all

start:
	cd $(root_dir) && docker-compose up --build

stop:
	cd $(root_dir) && docker-compose down
