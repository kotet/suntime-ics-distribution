FROM mcr.microsoft.com/devcontainers/python:3.13

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN ln -sf /bin/bash /bin/sh

RUN pipx install uv

RUN apt-get update \
    && apt-get install -y \
    git vim bash-completion rsync wget curl unzip jq \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN apt-get update \
    && apt-get install -y \
    build-essential libreadline-dev libncursesw5-dev libssl-dev libsqlite3-dev libgdbm-dev libbz2-dev liblzma-dev zlib1g-dev uuid-dev libffi-dev libdb-dev tk-dev \
    && apt-get clean && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs

RUN npm install --global yarn

RUN npm install --global @google/gemini-cli