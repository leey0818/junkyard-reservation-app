pipeline {
    agent {
        label 'docker'
    }

    triggers {
        githubPush()
    }

    environment {
        DOCKER_REGISTRY = '3.35.254.168:5000'
        DOCKER_IMAGE = 'junkyard-frontend'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/leey0818/junkyard-reservation-app.git'
            }
        }

        stage('Build') {
            steps {
                nodejs('NodeJS 20.16.0') {
                    sh "yarn --frozen-lockfile"
                    sh "CI=true yarn build"
                }
            }
        }

        stage('Docker Build and Push') {
            steps {
                sh "docker build --platform=linux/amd64 -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest ."
                sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest"
            }
        }
    }
}
