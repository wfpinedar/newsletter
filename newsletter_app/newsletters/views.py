from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.dateparse import parse_datetime
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from .models import Newsletter, Subscriber
from .serializers import NewsletterSerializer, SubscriberSerializer


class NewsletterViewSet(viewsets.ModelViewSet):
    """ The Newsletter view set"""
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer

    @action(detail=True, methods=['post'])
    def send(self, request, pk=None):
        newsletter = self.get_object()
        subscribers = newsletter.subscribers.filter(subscribed=True)

        html_content = render_to_string('emails/newsletter_template.html', {'newsletter': newsletter})
        text_content = strip_tags(html_content)

        for subscriber in subscribers:
            email = EmailMessage(
                subject=f"Newsletter: {newsletter.title}",
                body=text_content,
                from_email='wfpinedar@example.com',
                to=[subscriber.email],
            )
            email.content_subtype = 'html'
            if newsletter.content_pdf:
                email.attach_file(newsletter.content_pdf.path)
            if newsletter.content_image:
                email.attach_file(newsletter.content_image.path)

            email.send(fail_silently=False)

        return Response({'status': 'newsletter sent'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def schedule(self, request, pk=None):
        newsletter = self.get_object()
        schedule_time_str = request.data.get('scheduled_for')
        schedule_time = parse_datetime(schedule_time_str)

        if schedule_time:
            newsletter.scheduled_for = schedule_time
            newsletter.save()
            return Response({'status': 'newsletter scheduled'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid datetime format'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'status': 'newsletter sent'}, status=status.HTTP_200_OK)

class SubscriberViewSet(viewsets.ModelViewSet):
    """ The Subscriber view set"""
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer


@api_view(['GET'])
def unsubscribe(request, email):
    try:
        subscriber = Subscriber.objects.get(email=email)
        subscriber.subscribed = False
        subscriber.save()
        return Response({'status': 'unsubscribed successfully'}, status=status.HTTP_200_OK)
    except Subscriber.DoesNotExist:
        return Response({'error': 'Subscriber not found'}, status=status.HTTP_404_NOT_FOUND)
