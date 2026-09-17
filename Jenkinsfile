pipeline {
    agent any

    environment {
        // Change these to your actual Docker Hub username
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_HUB_USERNAME = 'jeffrinjojo'
        
        FRONTEND_IMAGE = "${DOCKER_HUB_USERNAME}/hr-frontend"
        BACKEND_IMAGE = "${DOCKER_HUB_USERNAME}/hr-backend"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
                
                echo "✅ Code checkout successful!"
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "🐳 Building Frontend & Backend Images..."
                sh 'docker build -t $FRONTEND_IMAGE:latest ./frontend'
                sh 'docker build -t $BACKEND_IMAGE:latest ./server'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "☁️ Pushing images to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: env.DOCKER_CREDENTIALS_ID, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $FRONTEND_IMAGE:latest'
                    sh 'docker push $BACKEND_IMAGE:latest'
                }
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline finished successfully!"
        }
        failure {
            echo "❌ Pipeline failed. Check the logs."
        }
    }
}
