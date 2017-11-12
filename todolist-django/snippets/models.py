# coding:utf-8
from django.db import models



class Snippet(models.Model):

    text = models.CharField(max_length=32, default='') 
    level = models.CharField(max_length=5, default='') 
    time = models.CharField(max_length=32, default='') 
    parentId = models.IntegerField()
    class Meta:
        ordering = ('id',)

class SnippetParent(models.Model):
    text = models.CharField(max_length=32, default='') 

    class Meta:
        ordering = ('id',)
