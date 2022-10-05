from django.contrib import admin
from leaflet.admin import LeafletGeoAdmin
from .models import POI

class POIAdmin(LeafletGeoAdmin):
    list_display = ['author', 'name', 'desc', 'created', 'updated']

admin.site.register(POI, POIAdmin)
