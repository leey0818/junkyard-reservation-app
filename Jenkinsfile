pipeline {
    agent {
        label 'docker'
    }

    triggers {
        githubPush()
    }

    environment {
        DOCKER_IMAGE = 'junkyard-frontend'
        REGISTRY = '3.35.254.168:5000'
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/leey0818/junkyard-reservation-app.git'
            }
        }

        stage('Docker Build and Push') {
            steps {
                sh 'docker buildx build --push --platform=linux/amd64,linux/arm64 -t ${env.REGISTRY}/${env.DOCKER_IMAGE}:latest .'
            }
        }
    }
}
