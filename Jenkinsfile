pipeline {
    /* insert Declarative Pipeline here */
    agent any
    stags {
        stage('Install Dependencies') {
            steps {
                ls -l
                echo "************ Installing Dependecies **************"
                npm install
            }
        }

        stage('Unit Test') {
            steps {
                ls -l
                echo "************ Unit Test Initializing **************"
                npm test
            }
        }
    }
}