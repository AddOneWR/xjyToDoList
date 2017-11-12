#coding:utf-8
from snippets.models import Snippet
from snippets.serializers import *
from rest_framework import generics



class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class SnippetParentList(generics.ListCreateAPIView):
    queryset = SnippetParent.objects.all()
    serializer_class = SnippetParentSerializer

class SnippetParentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = SnippetParent.objects.all()
    serializer_class = SnippetParentSerializer

