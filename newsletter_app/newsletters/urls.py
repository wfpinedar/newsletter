from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsletterViewSet, SubscriberViewSet, unsubscribe

router = DefaultRouter()
router.register(r'newsletters', NewsletterViewSet)
router.register(r'subscribers', SubscriberViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('unsubscribe/<str:email>/', unsubscribe, name='unsubscribe'),
]
