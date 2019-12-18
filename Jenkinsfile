pipeline {
    agent none

    stages {
        stage('Deploy development') {
            when {
            branch 'dev'
            }
            agent {
                label 'docker-slave'
            }
            steps {
                echo 'Deploying....'
                withCredentials([usernamePassword(credentialsId: 'iAPC-ATS', passwordVariable: 'CF_PASSWORD', usernameVariable: 'CF_USER')]) {
                    sh 'cf api https://api.scapp-console.swisscom.com'
                    sh 'cf auth iAPC-ATS $CF_PASSWORD'
                    sh 'cf target -o INI-DOS-FDN-ENB_BDD_Showcase -s Dev'
                    sh 'npm run build'
                    sh 'cd dist'
                    sh 'cf push -f ./manifestDev.yml -b staticfile_buildpack'
                }
            }
        }
        stage('Deploy production') {
            when {
            branch 'master'
            }
            agent {
                label 'docker-slave'
            }
            steps {
                echo 'Deploying....'
                withCredentials([usernamePassword(credentialsId: 'iAPC-ATS', passwordVariable: 'CF_PASSWORD', usernameVariable: 'CF_USER')]) {
                    sh 'cf api https://api.scapp-console.swisscom.com'
                    sh 'cf auth iAPC-ATS $CF_PASSWORD'
                    sh 'cf target -o INI-DOS-FDN-ENB_BDD_Showcase -s Prod'
                    sh 'cf push -f ./manifestProd.yml -b staticfile_buildpack'
                }
            }
        }
    }
}
