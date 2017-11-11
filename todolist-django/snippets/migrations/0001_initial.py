# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Snippet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('listId', models.IntegerField(default=b'')),
                ('text', models.CharField(default=b'', max_length=32)),
                ('level', models.CharField(default=b'', max_length=5)),
                ('time', models.CharField(default=b'', max_length=32)),
            ],
            options={
                'ordering': ('listId',),
            },
        ),
    ]
