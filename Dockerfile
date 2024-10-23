FROM python:3.10.6-alpine AS builder


WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

FROM python:3.10.6-alpine AS final

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app","--reload"]
