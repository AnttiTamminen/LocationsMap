# Generated by Django 4.1.2 on 2022-10-07 08:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('locations', '0002_alter_poi_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='poi',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='pois', to=settings.AUTH_USER_MODEL),
        ),
    ]
