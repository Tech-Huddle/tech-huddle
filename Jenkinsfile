pipeline {
    /* insert Declarative Pipeline here */
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Node.js') {
            steps {
                sh 'sudo curl -sL https://deb.nodesource.com/setup_16.x | bash -'
                sh 'sudo apt-get install -y nodejs'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'ls -l'
                echo "************ Installing Dependecies **************"
                sh 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                sh 'ls -l'
                echo "************ Unit Test Initializing **************"
                sh 'npm test'
            }
        }
    }
}