from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import POI

class POISerializer(GeoFeatureModelSerializer):
    class Meta:
        model = POI
        geo_field = 'location'
        fields = ['author', 'name', 'desc', 'created', 'updated']
        read_only_fields = ['id', 'created', 'updated']
