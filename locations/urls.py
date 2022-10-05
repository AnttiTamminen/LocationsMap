from rest_framework.routers import DefaultRouter
from .views import POIViewSet

router = DefaultRouter()

router.register(prefix='api/v1/locations', viewset=POIViewSet, basename='location')

urlpatterns = router.urls