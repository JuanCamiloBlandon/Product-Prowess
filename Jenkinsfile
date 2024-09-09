pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/JuanCamiloBlandon/Product-Prowess.git'
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
