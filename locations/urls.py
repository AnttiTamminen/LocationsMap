from rest_framework.routers import DefaultRouter
from .views import POIViewSet

router = DefaultRouter()

router.register(prefix='api/locations', viewset=POIViewSet, basename='location')

urlpatterns = router.urls