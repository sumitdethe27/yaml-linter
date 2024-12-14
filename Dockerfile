# Stage 1: Builder
FROM python:3.10-alpine as builder

# Install build dependencies required for Python packages
RUN apk add --no-cache gcc musl-dev libffi-dev make

WORKDIR /app
COPY requirements.txt .

RUN python -m venv /app/venv && \
    /app/venv/bin/pip install --no-cache-dir -r requirements.txt

COPY . .

# Stage 2: Runtime
FROM python:3.10-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache libffi

COPY --from=builder /app/venv /app/venv
COPY . .

ENV PATH="/app/venv/bin:$PATH"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
