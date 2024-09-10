pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    bat 'echo "Checking out branch..."'
                    bat 'git branch -a'
                }
                git branch: 'feature/alexis', url: 'https://github.com/JuanCamiloBlandon/Product-Prowess.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('Product-Prowess-Backend') {
                    bat 'npm cache clean --force'
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                dir('Product-Prowess-Backend') {
                    bat 'npm run build'
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
