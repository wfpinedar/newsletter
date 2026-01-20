FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip \
    && pip install -r requirements.txt

# Solo copiamos el backend
COPY newsletter_app /app/


EXPOSE 8000


CMD ["gunicorn", "newsletter_app.wsgi:application", "--bind", "0.0.0.0:8000"]
