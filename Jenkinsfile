System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';")

pipeline {
    agent { node { label 'selenium-slave' }
    }
    environment {
      TEST_USER = credentials('SA-PF00-ATS')
    }
    stages {
        stage('Deploy development') {
            when {
              branch 'dev'
            }
            tools {
              nodejs "node"
            }
            steps {
                echo 'Build....'
                withCredentials([usernamePassword(credentialsId: 'iAPC-ATS', passwordVariable: 'CF_PASSWORD', usernameVariable: 'CF_USER')]) {
                    sh 'cf api https://api.scapp-console.swisscom.com'
                    sh 'cf auth iAPC-ATS $CF_PASSWORD'
                    sh 'cf target -o INI-DOS-FDN-ENB_BDD_Showcase -s Dev'
                    sh 'rm package-lock.json'
                    sh 'rm -r node_modules'
                    sh 'npm install'
                    sh 'cp serenity-cli-2.1.9-all.jar node_modules/@serenity-js/cache'
                    sh 'npm run build'
                    sh 'cf push -f ./manifestDev.yml -b staticfile_buildpack'
                }
            }
        }

        stage('Cucumber test') {
            when {
                branch 'dev'
            }
            tools {
              nodejs "node"
            }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    echo 'Testing...'
                         sh 'npm test'
                    }
                }
        }

        stage('Publish Serenity Reports') {
            when {
                branch 'dev'
            }
            steps {
                echo 'Publish Serenity Reports...'
                publishHTML(target: [
                    reportName : 'Serenity',
                    reportDir:   'target/site/serenity',
                    reportFiles: 'index.html',
                    keepAll:     true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

        stage('Deploy production') {
            when {
                branch 'master'
            }
            tools {
                nodejs "node"
            }
            steps {
                echo 'Deploying....'
                withCredentials([usernamePassword(credentialsId: 'iAPC-ATS', passwordVariable: 'CF_PASSWORD', usernameVariable: 'CF_USER')]) {
                    sh 'cf api https://api.scapp-console.swisscom.com'
                    sh 'cf auth iAPC-ATS $CF_PASSWORD'
                    sh 'cf target -o INI-DOS-FDN-ENB_BDD_Showcase -s Prod'
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'cf push -f ./manifestProd.yml -b staticfile_buildpack'
                }
            }
        }
    }
}
