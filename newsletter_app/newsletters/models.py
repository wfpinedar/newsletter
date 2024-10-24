from django.db import models

class Newsletter(models.Model):
    title = models.CharField(max_length=255)
    content_pdf = models.FileField(upload_to='newsletters/')
    content_image = models.ImageField(upload_to='newsletters/', null=True, blank=True)
    scheculed_for = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed = models.BooleanField(default=True)
    newsletters = models.ManyToManyField(Newsletter, related_name='subscribers', blank=True)

    def __str__(self):
        return self.email
