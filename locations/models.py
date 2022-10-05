from django.contrib.gis.db import models
from django.utils import timezone
from django.conf import settings

class POI(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=30)
    desc = models.CharField(max_length=200)
    location = models.PointField()
    created = models.DateTimeField(editable=False)
    updated = models.DateTimeField(editable=False)

    def save(self, *args, **kwargs):
        if not self.id:
            self.created = timezone.now()
        self.updated = timezone.now()
        return super(POI, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
