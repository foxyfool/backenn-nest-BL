echo "Starting Brown Living backend deployment..."

echo "Step 1: Building Docker image"
docker build -t brownliving-backend .

# Tag Docker image for AWS ECR (Elastic Container Registry)
echo "Step 2: Tagging Docker image..."
# DEMO AWS ECR URL
docker tag brownliving-backend:latest 1234567890.dkr.ecr.ap-southeast-1.amazonaws.com/brownliving-backend:latest

# Step 3: Mock pushing to AWS ECR
echo "Step 3: Pushing to AWS ECR (mock)..."

aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 1234567890.dkr.ecr.ap-southeast-1.amazonaws.com
docker push 123456789012.dkr.ecr.ap-southeast-1.amazonaws.com/brownliving-backend:latest
echo "Successfully pushed image to AWS ECR"

# Step 4: Mock deploying to AWS EC2
echo "Step 4: Deploying to AWS EC2 (mock)..."

echo "Successfully deployed to AWS EC2 (mock)"

echo "Deployment completed successfully!"