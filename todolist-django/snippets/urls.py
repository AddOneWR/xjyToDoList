#coding:utf-8
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.SnippetList.as_view()),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.SnippetDetail.as_view()),
    url(r'^snippetsParent/$', views.SnippetParentList.as_view()),
    url(r'^snippetsParent/(?P<pk>[0-9]+)/$', views.SnippetParentDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
