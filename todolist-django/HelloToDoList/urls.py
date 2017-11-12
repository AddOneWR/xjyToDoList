# -*- coding: utf-8 -*-
from django.conf.urls import include, url
from todolist.views import render_html
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers, serializers, viewsets


urlpatterns = [
    url(r'^$', render_html),
    url(r'^', include('snippets.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
