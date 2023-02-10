pipeline {
    /* insert Declarative Pipeline here */
    agent {
        node {
            label 'nodejs'
        }
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                ls -l
                echo "************ Installing Dependecies **************"
                sh 'npm install'
            }
        }

        stage('Unit Test') {
            steps {
                ls -l
                echo "************ Unit Test Initializing **************"
                sh 'npm test'
            }
        }
    }
}