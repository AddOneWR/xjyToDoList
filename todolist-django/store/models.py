# -*- coding: utf-8 -*-
from django.db import models


# Create your models here.
# 这里注意:需要继承 models.Model ，不然没办法生成表的哈
class List(models.Model):
    listId = models.IntegerField(default='') #id属性，字段
    content = models.CharField(max_length=32, default='') 
    level = models.CharField(max_length=5, default='') 
    time = models.CharField(max_length=32, default='') 
    #此方法在print对象的时候，可以打印字符串，类似java中的toString()方法
    def __str__(self):
        return {'listId': self.listId,
                'content': self.content ,
                'level': self.level ,
                'time': self.time}
