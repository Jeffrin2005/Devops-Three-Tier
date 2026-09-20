# 1. Create Secret for MongoDB Connection
resource "kubernetes_secret" "hr_secrets" {
  metadata {
    name      = "hr-app-secrets"
    namespace = var.namespace
  }

  data = {
    MONGODB_URL = var.mongodb_url
  }

  type = "Opaque"
}

# 2. Backend Deployment
resource "kubernetes_deployment" "hr_backend" {
  metadata {
    name      = "hr-backend"
    namespace = var.namespace
    labels = {
      app = "hr-backend"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "hr-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "hr-backend"
        }
      }

      spec {
        container {
          name  = "backend"
          image = "${var.docker_username}/hr-backend:latest"

          port {
            container_port = 5000
          }

          env {
            name = "MONGODB_URL"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.hr_secrets.metadata[0].name
                key  = "MONGODB_URL"
              }
            }
          }
        }
      }
    }
  }
}

# 3. Backend Service
resource "kubernetes_service" "backend_service" {
  metadata {
    name      = "backend-service"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "hr-backend"
    }

    port {
      port        = 5000
      target_port = 5000
    }

    type = "ClusterIP"
  }
}

# 4. Frontend Deployment
resource "kubernetes_deployment" "hr_frontend" {
  metadata {
    name      = "hr-frontend"
    namespace = var.namespace
    labels = {
      app = "hr-frontend"
    }
  }

  spec {
    replicas = 2

    selector {
      match_labels = {
        app = "hr-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "hr-frontend"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = "${var.docker_username}/hr-frontend:latest"

          port {
            container_port = 80
          }
        }
      }
    }
  }
}

# 5. Frontend Service
resource "kubernetes_service" "frontend_service" {
  metadata {
    name      = "frontend-service"
    namespace = var.namespace
  }

  spec {
    selector = {
      app = "hr-frontend"
    }

    port {
      port        = 80
      target_port = 80
      node_port   = 30000
    }

    type = "NodePort"
  }
}
