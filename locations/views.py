from rest_framework import viewsets
from .models import POI
from .serializers import POISerializer
from rest_framework import generics, permissions

class POIViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]
    queryset = POI.objects.all()
    serializer_class = POISerializer

