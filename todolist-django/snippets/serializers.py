#coding:utf-8

from rest_framework import serializers
from snippets.models import Snippet

class SnippetSerializer(serializers.Serializer):
    """docstring for SnippetSerializer"""
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField() 
    level = serializers.CharField() 
    time = serializers.CharField()
    class Meta:
        model = Snippet
        fields = ('id','text', 'level', 'time')

    def create(self, validated_data):
        '''
         通过给定的有效数据创建并返回一个Snippet对象
        '''
        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        '''
        通过给定的有效数据更新并返回一个Snippet对象
        '''     
        instance.text = validated_data.get('text', instance.text)
        instance.level = validated_data.get('level', instance.level)
        instance.time = validated_data.get('time', instance.time)

        instance.save()
        return instance