variable "namespace" {
  description = "Kubernetes namespace for the HR app"
  type        = string
  default     = "default"
}

variable "docker_username" {
  description = "Docker Hub Username"
  type        = string
  default     = "jeffrinjojo"
}

variable "mongodb_url" {
  description = "MongoDB Atlas Connection String"
  type        = string
  default     = "mongodb+srv://jeffrinjojo1_db_user:W1knVgIBmTSCrIwB@cluster0.patv2cn.mongodb.net/?appName=Cluster0"
}
