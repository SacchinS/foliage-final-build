# Generated by Django 3.2.25 on 2025-01-31 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_jobpost_salary'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobpost',
            name='employment',
            field=models.CharField(default='null', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobpost',
            name='experience',
            field=models.CharField(default='null', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobpost',
            name='grade',
            field=models.CharField(default='null', max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='jobpost',
            name='site',
            field=models.CharField(default='null', max_length=255),
            preserve_default=False,
        ),
    ]
