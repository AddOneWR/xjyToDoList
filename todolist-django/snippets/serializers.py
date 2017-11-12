#coding:utf-8

from rest_framework import serializers
from snippets.models import *

class SnippetSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField()
    level = serializers.CharField()
    time = serializers.CharField()
    parentId = serializers.IntegerField()
    class Meta:
        model = Snippet
        fields = ('id','text', 'level', 'time','parentId')

    def create(self, validated_data):

        return Snippet.objects.create(**validated_data)

    def update(self, instance, validated_data):   
        instance.text = validated_data.get('text', instance.text)
        instance.level = validated_data.get('level', instance.level)
        instance.time = validated_data.get('time', instance.time)
        instance.parentId = validated_data.get('parentId',instance.parentId)

        instance.save()
        return instance

class SnippetParentSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    text = serializers.CharField()

    class Meta:
        model = SnippetParent
        fields = ('id','text')

    def create(self, validated_data):

        return SnippetParent.objects.create(**validated_data)

    def update(self, instance, validated_data):   
        instance.text = validated_data.get('text', instance.text)

        instance.save()
        return instance