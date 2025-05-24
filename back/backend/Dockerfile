FROM python:3.11-slim

WORKDIR /app/backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .


CMD ["flask", "--app", "main", "run", "--host=0.0.0.0", "--port=5000"]


