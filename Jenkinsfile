pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    sh 'echo "Checking out branch..."'
                    sh 'git branch -a'
                }
                git branch: 'feature/alexis', url: 'https://github.com/JuanCamiloBlandon/Product-Prowess.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('Product-Prowess-Backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Product-Prowess-Backend') {
                    sh 'npm run build'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizado.'
        }
    }
}
