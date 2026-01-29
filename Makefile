SHELL := /bin/bash
root_dir := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))

.PHONY: .list-available-targets

help: .list-available-targets

# From here https://stackoverflow.com/a/26339924
.list-available-targets:
	@echo -e "\nAvailable targets:"
	@LC_ALL=C $(MAKE) -pRrq -f $(firstword $(MAKEFILE_LIST)) : 2>/dev/null \
	  | awk -v RS= -F: '/(^|\n)# Files(\n|$$)/,/(^|\n)# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' \
	  | sort \
	  | grep -E -v -e '^[^[:alnum:]]' -e '^$@$$' \
	  | sed 's/^/  /'

include $(root_dir)qlc-visualizer/Makefile
