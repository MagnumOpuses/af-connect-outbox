def devProjectNamespace = "af-connect-dev"
def cicdProjectNamespace = "af-connect-cicd"
def applicationName = "af-connect-outbox"
def gitRepo = "https://github.com/MagnumOpuses/af-connect-outbox.git"
def gitBranch = "jenkins/test-field"

pipeline {
    agent any

    stages {
        stage('preamble') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject("${cicdProjectNamespace}") {
                            echo "Using project: ${openshift.project()}"
                        }
                    }
                }
            }
        }
        stage('Create Image Builder') {
            when {
                expression {
                    openshift.withCluster() {
                    openshift.withProject("${cicdProjectNamespace}") {
                        return !openshift.selector("bc", "${applicationName}").exists();
                        }
                    }
                }
            }
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject("${cicdProjectNamespace}") {
                            openshift.newBuild("--name=${applicationName}", "--strategy=docker", "${gitRepo}#${gitBranch}")
                        }
                    }
                }
            }
        }
        stage('Build Image') {
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject("${cicdProjectNamespace}") {
                            openshift.selector("bc", "${applicationName}").startBuild("--wait=true")
                        }
                    }
                }
            }
        }
        stage('Deploy Image') {
            when {
                expression {
                    openshift.withCluster() {
                    openshift.withProject("${cicdProjectNamespace}") {
                            return !openshift.selector('dc', "${applicationName}").exists()
                        }
                    }
                }
            }
            steps {
                script {
                    openshift.withCluster() {
                        openshift.withProject("${cicdProjectNamespace}") {
                            sh """
                            oc new-app ${applicationName} \
                            -e HOST=localhost \
                            -e PORT=3000
                            """
                        }
                    }
                }
            }
        }
    }
}