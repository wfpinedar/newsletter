from django.utils import timezone
from .models import Newsletter
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_scheduled_newsletters():
    now = timezone.now()
    newsletters = Newsletter.objects.filter(scheduled_for__lte=now, subscribers__isnull=False)

    for newsletter in newsletters:
        html_content = render_to_string('emails/newsletter_template.html', {'newsletter': newsletter})
        text_content = strip_tags(html_content)

        subscribers = newsletter.subscribers.filter(subscribed=True)

        for subscriber in subscribers:
            email = EmailMessage(
                subject=f"Newsletter: {newsletter.title}",
                body=text_content,
                from_email='from@example.com',
                to=[subscriber.email],
            )
            email.content_subtype = 'html'

            if newsletter.content_pdf:
                email.attach_file(newsletter.content_pdf.path)
            if newsletter.content_image:
                email.attach_file(newsletter.content_image.path)

            email.send(fail_silently=False)

        newsletter.scheduled_for = None  # Una vez enviado, quitamos la programación
        newsletter.save()
