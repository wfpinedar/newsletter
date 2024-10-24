from django.test import TestCase
from .models import Newsletter, Subscriber
from django.urls import reverse

class NewsletterTests(TestCase):

    def setUp(self):
        self.newsletter = Newsletter.objects.create(
            title="Newsletter Test",
        )
        self.subscriber = Subscriber.objects.create(
            email="test@example.com"
        )

    def test_create_newsletter(self):
        self.assertEqual(Newsletter.objects.count(), 1)
        self.assertEqual(self.newsletter.title, "Newsletter Test")

    def test_create_subscriber(self):
        self.assertEqual(Subscriber.objects.count(), 1)
        self.assertEqual(self.subscriber.email, "test@example.com")

    def test_send_newsletter(self):
        # Prueba si el endpoint de enviar newsletter funciona
        response = self.client.post(reverse('newsletter-send', kwargs={'pk': self.newsletter.id}))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['status'], 'newsletter sent')