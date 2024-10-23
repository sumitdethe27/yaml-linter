# Use an Alpine base image
FROM python:3.10.6-alpine AS builder

# Upgrade pip
RUN pip install --upgrade pip

# Install build dependencies
RUN apk add --no-cache gcc musl-dev libffi-dev

# Set a working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Clean up after installation
RUN apk del gcc musl-dev libffi-dev

# Copy your application code
COPY app /app/app
COPY static /app/static

# Start a new stage for the final image
FROM python:3.10.6-alpine AS final

# Set a working directory
WORKDIR /app

# Copy installed packages from builder
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages

# Copy your application code from the builder stage
COPY --from=builder /app/app /app/app
COPY --from=builder /app/static /app/static

# Command to run your application with the full path to uvicorn
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

