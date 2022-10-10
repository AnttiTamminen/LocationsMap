from rest_framework.routers import DefaultRouter
from .views import POIViewSet

router = DefaultRouter()

router.register('api/locations', POIViewSet, 'locations')

urlpatterns = router.urls