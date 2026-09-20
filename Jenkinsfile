pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'
        DOCKER_HUB_USERNAME = 'jeffrinjojo'

        FRONTEND_IMAGE = "${DOCKER_HUB_USERNAME}/hr-frontend"
        BACKEND_IMAGE = "${DOCKER_HUB_USERNAME}/hr-backend"

        IMAGE_TAG = "${BUILD_NUMBER}"

        K8S_DIR = 'k8s'

        // 📧 Your email address for notifications
        NOTIFY_EMAIL = 'jetsetterflash@gmail.com'
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
                echo "✅ Code checkout successful!"
                echo "🏷️ Image Tag: ${IMAGE_TAG}"
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "🐳 Building Docker images..."
                sh 'docker build -t $FRONTEND_IMAGE:$IMAGE_TAG ./frontend'
                sh 'docker build -t $BACKEND_IMAGE:$IMAGE_TAG ./server'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "☁️ Pushing images to Docker Hub..."
                withCredentials([
                    usernamePassword(
                        credentialsId: env.DOCKER_CREDENTIALS_ID,
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $FRONTEND_IMAGE:$IMAGE_TAG'
                    sh 'docker push $BACKEND_IMAGE:$IMAGE_TAG'
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                echo "☸️ Updating Kubernetes image tags..."
                sh '''
                    sed -i "s|image: ${FRONTEND_IMAGE}:.*|image: ${FRONTEND_IMAGE}:${IMAGE_TAG}|g" ${K8S_DIR}/*.yaml
                    sed -i "s|image: ${BACKEND_IMAGE}:.*|image: ${BACKEND_IMAGE}:${IMAGE_TAG}|g" ${K8S_DIR}/*.yaml
                    echo "✅ Kubernetes manifests updated:"
                    grep -R "image:" ${K8S_DIR}
                '''
            }
        }

        stage('Commit & Push to GitHub') {
            steps {
                echo "📤 Pushing Kubernetes changes to GitHub..."
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )
                ]) {
                    sh '''
                        git config user.name "Jenkins"
                        git config user.email "jenkins@localhost"
                        git add ${K8S_DIR}/
                        git commit -m "Update Kubernetes images to ${IMAGE_TAG}" || echo "No changes to commit"
                        git push https://${GIT_USER}:${GIT_TOKEN}@github.com/Jeffrin2005/Devops-Three-Tier.git HEAD:main
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "🎉 CI/CD + GitOps pipeline completed!"
            echo "🚀 Argo CD will automatically deploy the new image."

            // ✅ Send success email
            mail(
                to: "${NOTIFY_EMAIL}",
                subject: "✅ Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello,

Your Jenkins pipeline completed successfully! 🎉

📋 Job Name   : ${env.JOB_NAME}
🏷️ Build No   : ${env.BUILD_NUMBER}
🐳 Image Tag  : ${IMAGE_TAG}
🔗 Build URL  : ${env.BUILD_URL}

✅ Docker images pushed to Docker Hub.
✅ Kubernetes manifests updated in GitHub.
🚀 ArgoCD will auto-deploy the new version shortly.

- Jenkins
                """
            )
        }

        failure {
            echo "❌ Pipeline failed. Check the logs."

            // ❌ Send failure email
            mail(
                to: "${NOTIFY_EMAIL}",
                subject: "❌ Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello,

Your Jenkins pipeline has FAILED! ❌

📋 Job Name   : ${env.JOB_NAME}
🏷️ Build No   : ${env.BUILD_NUMBER}
🔗 Build URL  : ${env.BUILD_URL}

⚠️ Nothing was pushed to Docker Hub.
⚠️ Kubernetes is still running the last stable version.

Please check the console output for details:
${env.BUILD_URL}console

- Jenkins
                """
            )
        }
    }
}
