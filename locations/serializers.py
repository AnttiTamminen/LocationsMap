from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import POI

class POISerializer(GeoFeatureModelSerializer):
    class Meta:
        model = POI
        geo_field = 'location'
        fields = ['author', 'name', 'desc']
        read_only_fields = ['id', 'created', 'updated']
