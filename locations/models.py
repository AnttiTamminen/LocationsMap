from django.contrib.gis.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class POI(models.Model):
    userid = models.ForeignKey(User, related_name='pois', null=True, on_delete=models.SET_NULL)
    author = models.CharField(max_length=20)
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
