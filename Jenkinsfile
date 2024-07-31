Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker { image 'node:20.16.0-alpine3.20' } }
    stages {
        stage('build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}
