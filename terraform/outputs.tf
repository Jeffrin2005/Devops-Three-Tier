output "frontend_service_type" {
  description = "Type of Service created for Frontend"
  value       = kubernetes_service.frontend_service.spec[0].type
}

output "frontend_node_port" {
  description = "NodePort allocated for Frontend access"
  value       = kubernetes_service.frontend_service.spec[0].port[0].node_port
}

output "backend_service_name" {
  description = "ClusterIP Service Name for Backend"
  value       = kubernetes_service.backend_service.metadata[0].name
}
