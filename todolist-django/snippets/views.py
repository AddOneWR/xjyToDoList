#coding:utf-8
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
# Create your views here.

class JSONResponse(HttpResponse):
    """docstring for JSONRenderer"""
    '''
    将HttpResponse对象相应的内容转化为json
    '''
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def snippet_list(request,format=None):
    '''
    显示所有的snippets的对象,或者创建一个新的对象
    '''
    if request.method == 'GET':
        snippets = Snippet.objects.all()
        serializers = SnippetSerializer(snippets, many=True)

        return JSONResponse(serializers.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializers = SnippetSerializer(data=data)
        if serializers.is_valid():
            serializers.save()

            return JSONResponse(serializers.data, status=201)
        return JSONResponse(serializers.errors, status=400)


@csrf_exempt
def snippet_detail(request, pk ,format=None):
    '''
    查找、更新或者删除一个snippet
    '''
    try:
        snippet = Snippet.objects.get(pk=pk)
    except Snippet.DoesNotExist:

        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = SnippetSerializer(snippet)

        return JSONResponse(serializer.data)
    
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = SnippetSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()

            return JSONResponse(serializer.data)
        return JSONResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()

        return HttpResponse(status=204)
