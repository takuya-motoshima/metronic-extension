FROM amazonlinux:2023.3.20240131.0

# Update yum.
RUN yum update -y

# Install basic commands such as ps.
RUN yum install procps -y

# Install Node.js.
RUN yum install https://rpm.nodesource.com/pub_16.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
RUN yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1

# Copy source code to Docker image.
COPY . /usr/src/app

# Install dependencies of this package.
WORKDIR /usr/src/app
RUN npm install

# Port number to listen on.
EXPOSE 3000