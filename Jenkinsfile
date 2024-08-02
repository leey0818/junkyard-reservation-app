pipeline {
    agent {
        label 'docker'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/leey0818/junkyard-reservation-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build --platform linux/amd64 -t 3.35.254.168:5000/${DOCKER_IMAGE_NAME}:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker push 3.35.254.168:5000/${DOCKER_IMAGE_NAME}:latest'
            }
        }
    }
}
