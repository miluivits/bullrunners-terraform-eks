# BullRunners – Crypto Portfolio Tracker

BullRunners is a MERN-stack based crypto portfolio tracker application.  
The goal is to provide users with a clean and simple interface to track their cryptocurrency holdings, view market data, and manage portfolios securely.

This repository (`bullrunners-terraform-eks`) will serve as the **monorepo** containing:

- The **backend** (Node.js + Express + MongoDB)
- The **frontend** (React)
- Infrastructure as Code (IaC) using **Terraform** for AWS EKS
- Docker setup for containerization and local development

---

## Project Roadmap

### Phase 1 – Core Development

**Backend**

- Setup Express server
- Connect to MongoDB
- Implement authentication (JWT-based)
- CRUD APIs for portfolio and transactions
  **Frontend**
- React app with login/register flow
- Dashboard to display crypto portfolio
- Individual token page
- Integration with backend APIs

Monorepo structure with `frontend/` and `backend/`

### Phase 2 – Containerization

- [ ] Dockerize backend and frontend
- [ ] Setup `docker-compose` for local dev environment
- [ ] Add environment variables and `.env.example` files

### Phase 3 – Infrastructure on AWS

- Provision AWS resources with Terraform
  - VPC, subnets, security groups
  - EKS cluster
  - Managed MongoDB (Atlas or self-hosted on AWS)
- Push Docker images to Amazon ECR
- Deploy workloads to EKS with Helm/Kubernetes

---

## Tech Stack

**Frontend**

- React (Vite)
- CSS

**Backend**

- Node.js + Express
- MongoDB
- JWT Authentication

**Infrastructure**

- Docker & Docker Compose
- Terraform (AWS provider)
- Kubernetes (AWS EKS)
- AWS ECR for container registry
