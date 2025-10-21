#!/usr/bin/env bash

set -e
set -o nounset

script_dir="$(cd "$(dirname $0)" && pwd)"

ip_addr="$( \
	ipconfig getifaddr "$( \
		route get default \
		| awk '/interface: / {print $2}' \
	)" \
)"

echo -e "\n\n"
echo "------------------------------------------------------------------------"
echo -e "\n DEMARRAGE QLC+"
echo ""
echo " Local IP address: ${ip_addr}"
echo " Remove QLC+ Web URL: http://${ip_addr}:9999"
echo
echo "------------------------------------------------------------------------"
echo -e "\n\n"

/Applications/QLC+.app/Contents/MacOS/qlcplus \
    --fullscreen \
    --open "${script_dir}"/show.qxw \
    --web
