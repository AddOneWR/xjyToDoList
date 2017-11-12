# -*- coding: utf-8 -*-
from django.db import models


class List(models.Model):
    text = models.CharField(max_length=32, default='') 
    level = models.CharField(max_length=5, default='') 
    time = models.CharField(max_length=32, default='') 
    
    def __str__(self):
        return {
                'text': self.text ,
                'level': self.level ,
                'time': self.time}
